
SHELL := /bin/bash

BOOST ?= boost_1_91_0
EMSDK ?= emsdk
PORT  ?= 8000

CPP_SRC     := engines/cpp/registry.cpp $(filter-out engines/cpp/icu/engine.cpp engines/cpp/memoregex/engine.cpp engines/cpp/rematch/engine.cpp engines/cpp/re2c/engine.cpp,$(wildcard engines/cpp/*/engine.cpp))
MEMO_C_SRC  := $(wildcard engines/cpp/memoregex/src/*.c engines/cpp/memoregex/src/vendor/*.c)
MEMO_C_OBJ  := $(patsubst engines/cpp/%.c,build/cobj/%.o,$(MEMO_C_SRC))
C_SRC       := $(wildcard engines/cpp/*/csrc/*.c)
C_OBJ       := $(patsubst engines/cpp/%.c,build/cobj/%.o,$(C_SRC))
CPP_INC     := -I $(BOOST) -I vendor/quickjs-ng -I vendor/mujs -I vendor/oniguruma/src \
               -I vendor/pcre2/src -I vendor/re2 -I vendor/abseil-cpp -I vendor/tre/lib -I engines/cpp/tre -I vendor/pcre1 -I vendor/lexertl17/include -I engines/cpp/sregex/csrc -I vendor/pire -I vendor/reflex/include
NATIVE_LIBS := build/lib/libpcre2.a build/lib/libre2.a build/lib/libquickjsre.a \
               build/lib/libmujsre.a build/lib/libonig.a build/lib/libtre.a build/lib/libpcre1.a build/lib/libpire.a build/lib/libreflex.a \
               build/lib/libabsl.a   # after libre2.a so re2 absl refs resolve
PIRE_CXX    := -DPIRE_NO_CONFIG -D_LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION -D_LIBCPP_ENABLE_CXX17_REMOVED_BINDERS
BOOST_SRC   :=
EMFLAGS     := -sMODULARIZE=1 -sEXPORT_NAME=createEngines \
               -sEXPORTED_FUNCTIONS=_engine_count,_engine_info,_engine_match,_malloc,_free \
               -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,UTF8ToString \
               -sENVIRONMENT=worker,web,node -sALLOW_MEMORY_GROWTH=1 -sSTACK_SIZE=4MB   # 4MB: TinyRE overflows the 64KB default

RUST_WASM   := web/rust_regex.wasm
RUSTUP_HOME ?= $(CURDIR)/.rustup
CARGO_HOME  ?= $(CURDIR)/.cargo
CARGO       ?= $(CARGO_HOME)/bin/cargo
CARGO_ENV   := RUSTUP_HOME=$(RUSTUP_HOME) CARGO_HOME=$(CARGO_HOME) CARGO_TARGET_DIR=$(CURDIR)/engines/rust/target

GO     ?= $(CURDIR)/go/bin/go
DOTNET ?= $(CURDIR)/.dotnet/dotnet

LANGS := wasm rust go dotnet ocaml nim zig haskell java swift icu memoregex rematch re2c js python

.PHONY: all toolchains engines $(LANGS) serve test test-ui reference-test reference-capture FORCE check-symbols clean distclean deepclean vendor-fetch vendor-clean vendor-recreate vendor-submodules vendor-patch docker-image dist dist-docker

toolchains: ; etc/toolchains.sh
all: toolchains
	$(MAKE) $(LANGS)

OUT_wasm   := web/engines.js
OUT_rust   := $(RUST_WASM)
OUT_go     := web/go_regex.wasm
OUT_dotnet := web/dotnet/_framework/dotnet.js
OUT_ocaml  := web/ocaml.js
OUT_nim    := web/nim.js
OUT_zig    := web/zig_regex.wasm
OUT_haskell := web/haskell_regex.wasm
OUT_java   := web/java_regex.js
OUT_swift  := web/swift_regex.wasm
OUT_icu    := web/icu_regex.js
OUT_memoregex := web/memo_regex.js
OUT_rematch := web/rematch.js
OUT_re2c := web/re2c_regex.js
OUT_js     := web/js/browser.js
OUT_python := web/python/engines.py
$(foreach L,$(LANGS),$(eval $(L): $(OUT_$(L))))

web/js/browser.js: engines/js/browser.js engines/js/re2js.js engines/js/engine262.js
	mkdir -p web/js && cp $^ web/js/
	@echo "staged web/js/"
web/python/engines.py: engines/python/engines.py engines/python/freeze.txt
	mkdir -p web/python && cp $^ web/python/
	@echo "staged web/python/"

engines: $(NATIVE_LIBS)
NAT := etc/build-native-engines.sh
define native_lib
build/lib/lib$(1).a: $$(wildcard $(2)) $$(NAT)
	$$(NAT) $(3)
endef
$(eval $(call native_lib,quickjsre,vendor/quickjs-ng/*.c vendor/quickjs-ng/*.h,quickjs))
$(eval $(call native_lib,mujsre,vendor/mujs/*.c vendor/mujs/*.h,mujs))
$(eval $(call native_lib,onig,vendor/oniguruma/src/*.c vendor/oniguruma/src/*.h,oniguruma))
$(eval $(call native_lib,tre,vendor/tre/lib/*.c vendor/tre/lib/*.h,tre))
$(eval $(call native_lib,pcre2,vendor/pcre2/src/*.c vendor/pcre2/src/*.h,pcre2))
$(eval $(call native_lib,pcre1,vendor/pcre1/*.c vendor/pcre1/*.h,pcre1))
$(eval $(call native_lib,re2,vendor/re2/re2/*.cc vendor/re2/re2/*.h vendor/re2/util/*.cc vendor/re2/util/*.h,re2))
build/lib/libabsl.a: $(NAT)
	$(NAT) abseil
build/lib/libre2.a: build/lib/libabsl.a
$(eval $(call native_lib,pire,vendor/pire/pire/*.cpp vendor/pire/pire/*.h,pire))
$(eval $(call native_lib,reflex,vendor/reflex/lib/*.cpp vendor/reflex/include/reflex/*.h,reflex))
vendor/icu/wasm/lib/libicui18n.a: $(NAT)
	$(NAT) icu
vendor/rematch/build-wasm/lib/libREmatch.a: $(NAT)
	$(NAT) rematch
vendor/re2c/build-wasm/libre2c.a: $(NAT) | vendor-patch
	$(NAT) re2clib

# Patch pristine submodule checkouts; order-only prereq of the submodule builds above so a reset re-patches.
VENDOR_PATCHES := re2c
vendor-patch:
	@set -e; for p in $(VENDOR_PATCHES); do etc/vendor/$$p.sh vendor/$$p; done

vendor-fetch:
	@set -e; for e in $(VENDOR_ENGINES); do echo "== vendor $$e =="; etc/vendor/$$e.sh engines/cpp/$$e; done

VENDOR_ENGINES := glibc matp memoregex minrx nure plan9 re1 remimu rxspencer slre \
                  sregex srell subreg tinyre tinyregex trex ximtech

VENDORED_SRC := \
  $(addprefix engines/cpp/glibc/gnusrc/,regex.c regex_internal.c regex_internal.h regcomp.c regexec.c regex.h \
     attribute.h cdefs.h dynarray.h gettext.h gnulib-common.h intprops-internal.h intprops.h libc-config.h verify.h) \
  $(addprefix engines/cpp/glibc/gnusrc/malloc/,dynarray.h dynarray-skeleton.c dynarray_at_failure.c dynarray_emplace_enlarge.c dynarray_finalize.c dynarray_resize.c dynarray_resize_clear.c) \
  $(addprefix engines/cpp/matp/,regex_allocators.c regex_allocators.h regex_character_class.h regex_node.h regex_compile.c regex_compile.h regex_parse.c regex_parse.h regex_program.c regex_program.h regex_vm_pike.c regex_vm_pike.h) \
  $(addprefix engines/cpp/memoregex/src/,backtrack.c compile.c log.c log.h memoize.c memoize.h pike.c recursive.c regexp.c regexp.h rle.c rle.h statistics.c statistics.h sub.c thompson.c uthash.h y.tab.c) \
  $(addprefix engines/cpp/memoregex/src/vendor/,avl_tree.c avl_tree.h) \
  $(addprefix engines/cpp/minrx/,minrx.c charset.c minrx.h charset.h) \
  $(addprefix engines/cpp/nure/,nu-re.c nu-re.h) \
  $(addprefix engines/cpp/plan9/csrc/,regaux.c regcomp.c regexec.c regsub.c regcomp.h regexp9.h) \
  $(addprefix engines/cpp/re1/csrc/,compile.c recursive.c backtrack.c thompson.c pike.c sub.c regexp.h y.tab.c) engines/cpp/re1/parse.y \
  engines/cpp/remimu/remimu.h \
  $(addprefix engines/cpp/rxspencer/csrc/,regcomp.c regexec.c regerror.c regfree.c regex.h regex2.h engine.inc) \
  $(addprefix engines/cpp/slre/,slre.h slre.c) \
  $(addprefix engines/cpp/sregex/csrc/,sre_regex.c sre_regex_compiler.c sre_vm_pike.c sre_vm_thompson.c sre_capture.c sre_palloc.c sre_vm_bytecode.c sre_yyparser.c) \
  $(addprefix engines/cpp/sregex/csrc/sregex/,sregex.h sre_regex.h sre_vm_thompson.h sre_capture.h sre_core.h sre_vm_bytecode.h sre_palloc.h sre_yyparser.h ddebug.h) \
  engines/cpp/srell/srell.hpp \
  $(addprefix engines/cpp/subreg/,subreg.h subreg.c) \
  engines/cpp/tinyre/csrc/re.c \
  $(addprefix engines/cpp/tinyregex/,re.h re.c) \
  $(addprefix engines/cpp/trex/,trex.h trex.c) \
  $(addprefix engines/cpp/ximtech/,Regex.c Regex.h)

vendor-clean:
	rm -f $(VENDORED_SRC)

vendor-recreate: vendor-clean
	$(MAKE) vendor-fetch

vendor-submodules:
	git submodule sync --recursive
	git submodule update --init --force --recursive

.SECONDEXPANSION:
build/cobj/%.o: engines/cpp/%.c $$(wildcard engines/cpp/$$(dir $$*)cflags) $(VENDORED_SRC)
	@mkdir -p $(@D)
	. $(EMSDK)/emsdk_env.sh >/dev/null 2>&1 && emcc -O2 -x c -c $(CPP_INC) $(shell cat engines/cpp/$(dir $*)cflags 2>/dev/null) $< -o $@

web/engines.js: $(CPP_SRC) engines/cpp/registry.h $(NATIVE_LIBS) $(C_OBJ) $(BOOST_SRC) $(VENDORED_SRC)
	. $(EMSDK)/emsdk_env.sh >/dev/null 2>&1 && \
	em++ -O2 -std=c++17 -fexceptions $(PIRE_CXX) $(CPP_INC) $(CPP_SRC) $(BOOST_SRC) $(NATIVE_LIBS) $(C_OBJ) $(EMFLAGS) -o web/engines.js
	@echo "built web/engines.js + web/engines.wasm"

define em_module
	. $(EMSDK)/emsdk_env.sh >/dev/null 2>&1 && \
	em++ -O2 -std=c++17 -fexceptions $(1) engines/cpp/registry.cpp $(2) $(3) \
	  $(EMFLAGS) -sEXPORT_NAME=$(4) -o $(5)
	@echo "built $(5) + $(5:.js=.wasm)"
endef

web/icu_regex.js: engines/cpp/registry.cpp engines/cpp/icu/engine.cpp engines/cpp/registry.h vendor/icu/wasm/lib/libicui18n.a
	$(call em_module,-DU_STATIC_IMPLEMENTATION -I vendor/icu/icu/source/common -I vendor/icu/icu/source/i18n,engines/cpp/icu/engine.cpp,vendor/icu/wasm/lib/libicui18n.a vendor/icu/wasm/lib/libicuuc.a vendor/icu/wasm/stubdata/libicudata.a,createIcu,web/icu_regex.js)

web/memo_regex.js: engines/cpp/registry.cpp engines/cpp/memoregex/engine.cpp engines/cpp/registry.h $(MEMO_C_OBJ) $(VENDORED_SRC)
	$(call em_module,-I engines/cpp/memoregex/src,engines/cpp/memoregex/engine.cpp,$(MEMO_C_OBJ),createMemo,web/memo_regex.js)

web/rematch.js: engines/cpp/registry.cpp engines/cpp/rematch/engine.cpp engines/cpp/rematch/rematch_shim.cpp engines/cpp/registry.h vendor/rematch/build-wasm/lib/libREmatch.a
	$(call em_module,-I vendor/rematch/src/targets/lib/include,engines/cpp/rematch/engine.cpp engines/cpp/rematch/rematch_shim.cpp,vendor/rematch/build-wasm/lib/libREmatch.a,createRematch,web/rematch.js)

web/re2c_regex.js: engines/cpp/registry.cpp engines/cpp/re2c/engine.cpp engines/cpp/registry.h vendor/re2c/build-wasm/libre2c.a
	$(call em_module,-I vendor/re2c/lib,engines/cpp/re2c/engine.cpp,vendor/re2c/build-wasm/libre2c.a vendor/re2c/build-wasm/libre2c_core.a,createRe2c,web/re2c_regex.js)

$(RUST_WASM): $(wildcard engines/rust/src/lib.rs engines/rust/src/engines/*.rs) engines/rust/Cargo.toml
	cd engines/rust && $(CARGO_ENV) RUSTFLAGS="-C target-feature=+simd128" $(CARGO) build --release --target wasm32-unknown-unknown
	cp engines/rust/target/wasm32-unknown-unknown/release/rust_regex_wasm.wasm $@
	@echo "built $@"

web/go_regex.wasm: engines/go/main.go engines/go/go.mod
	cd engines/go && GOOS=js GOARCH=wasm $(GO) build -o $(CURDIR)/web/go_regex.wasm .
	cp "$$($(GO) env GOROOT)/lib/wasm/wasm_exec.js" web/wasm_exec.js
	@echo "built web/go_regex.wasm + web/wasm_exec.js"

web/dotnet/_framework/dotnet.js: engines/dotnet/Engines.cs engines/dotnet/RegexBridge.csproj engines/dotnet/main.js
	DOTNET_ROOT=$(CURDIR)/.dotnet $(DOTNET) publish engines/dotnet/RegexBridge.csproj -c Release
	rm -rf web/dotnet && cp -r engines/dotnet/bin/Release/net8.0/browser-wasm/AppBundle web/dotnet
	@echo "built web/dotnet"

OPAM ?= opam
OPAMROOT ?= $(CURDIR)/.opam
OPAM_SWITCH ?= lf
REGELK := charclasses flags regex bytecode anchors oracle cdn regs compiler interpreter
web/ocaml.js: engines/ocaml/bridge.ml $(wildcard vendor/regelk/*.ml vendor/regelk/parser_src/*)
	[ -e vendor/regelk/regex.ml ] || { echo "vendor/regelk missing — run: git submodule update --init"; exit 1; }
	rm -rf build/regelk && mkdir -p build/regelk
	cp vendor/regelk/*.ml vendor/regelk/parser_src/regex_lexer.mll engines/ocaml/bridge.ml build/regelk/
	printf '%%{\nopen Charclasses\nopen Regex\n%%}\n' | cat - vendor/regelk/parser_src/regex_parser.mly > build/regelk/regex_parser.mly
	export OPAMROOT=$(OPAMROOT) && eval $$($(OPAM) env --switch=$(OPAM_SWITCH)) && cd build/regelk && \
	  menhir regex_parser.mly >/dev/null 2>&1 && ocamllex -q regex_lexer.mll && \
	  ocamlfind ocamlc -package js_of_ocaml,re,str -linkpkg \
	    $(addsuffix .ml,$(REGELK)) regex_parser.mli regex_parser.ml regex_lexer.ml bridge.ml -o bridge.byte && \
	  js_of_ocaml bridge.byte -o $(CURDIR)/web/ocaml.js
	@echo "built web/ocaml.js"

NIM       ?= $(CURDIR)/.nim/bin/nim
NIM_PKGS  ?= $(CURDIR)/.nimble/pkgs2
web/nim.js: engines/nim/bridge.nim
	$(NIM) js -d:release --hints:off --warnings:off --nimblePath:$(NIM_PKGS) -o:web/nim.js $<
	@echo "built web/nim.js"

ZIG ?= $(CURDIR)/.zig/zig
web/zig_regex.wasm: engines/zig/bridge.zig engines/zig/build.zig
	cd engines/zig && $(ZIG) build
	cp engines/zig/zig-out/bin/zig_regex.wasm web/zig_regex.wasm
	@echo "built web/zig_regex.wasm"

web/haskell_regex.wasm: engines/haskell/Wrapper.hs engines/haskell/Main.hs engines/haskell/tdfa.cabal
	cd engines/haskell && bash -c '. $(CURDIR)/.ghc-wasm/env && wasm32-wasi-cabal build'
	cp `find engines/haskell/dist-newstyle -name tdfa.wasm | head -1` $@
	@echo "built web/haskell_regex.wasm"

MVN ?= $(CURDIR)/.maven/current/bin/mvn
web/java_regex.js: engines/java/pom.xml $(wildcard engines/java/src/main/java/regexbridge/*.java)
	JAVA_HOME=$(CURDIR)/.jdk/current $(MVN) -B -q -Dmaven.repo.local=$(CURDIR)/.m2 -f engines/java/pom.xml process-classes
	cp engines/java/target/javascript/java_regex.js $@
	@echo "built web/java_regex.js"

SWIFT ?= $(CURDIR)/.swift/current/usr/bin/swift
SWIFT_SDK := 6.3-RELEASE-wasm32-unknown-wasip1
web/swift_regex.wasm: engines/swift/Package.swift engines/swift/Sources/swiftregex/main.swift
	HOME=$(CURDIR) $(SWIFT) build -c release --swift-sdk $(SWIFT_SDK) --package-path engines/swift \
	  -Xlinker --export=engine_count -Xlinker --export=engine_info -Xlinker --export=engine_match \
	  -Xlinker --export=alloc -Xlinker --export=dealloc \
	  -Xswiftc -Xclang-linker -Xswiftc -mexec-model=reactor
	cp engines/swift/.build/wasm32-unknown-wasip1/release/swiftregex.wasm $@
	@echo "built web/swift_regex.wasm"

serve: $(LANGS)
	@echo "starting dev server (etc/serve.py prints the URL; Ctrl-C to stop)…"
	PORT=$(PORT) python3 etc/serve.py

dist: all
	rm -rf dist && mkdir -p dist && cp -a web/. dist/
	@echo "dist/ ready ($$(du -sh dist | cut -f1)) — deploy as a static site; entry: index.html"

dist-docker: .dockerignore
	rm -rf dist
	docker buildx build --target site --output type=local,dest=dist -f etc/Dockerfile .

test: $(LANGS) check-symbols
	e2e/run-reference.sh reference-check.mjs
test-ui: $(LANGS)
	cd e2e && ./run-tests.sh

check-symbols: engines
	etc/check-symbol-shadowing.sh

reference-test:
	e2e/run-reference.sh reference-check.mjs

reference-capture:
	e2e/run-reference.sh reference-capture.mjs

README.md: $(LANGS) FORCE
	@set -e; tmp=$$(mktemp); e2e/regex-table.sh --list > "$$tmp"; \
	awk -v b='<!-- engine-list-begin -->' -v e='<!-- engine-list-end -->' \
	  'NR==FNR{L=L $$0 ORS; next} index($$0,b){print; printf "%s",L; s=1; next} index($$0,e){s=0} !s' \
	  "$$tmp" README.md > README.md.new && mv README.md.new README.md && rm -f "$$tmp"
FORCE:

docker-image: .dockerignore
	docker build --progress=plain --target base -f etc/Dockerfile -t babel-re .

.dockerignore: .gitignore
	@{ echo '# GENERATED from .gitignore by make — edit .gitignore, not this file.'; \
	   sed 's,^/,,' $<; echo '.git'; } > $@

WEB_OUT     := $(OUT_wasm) $(OUT_rust) $(OUT_go) $(OUT_ocaml) $(OUT_nim) $(OUT_zig) $(OUT_haskell) $(OUT_java) $(OUT_swift) $(OUT_icu) $(OUT_memoregex) $(OUT_rematch) $(OUT_re2c) \
               web/engines.wasm web/wasm_exec.js web/dotnet web/icu_regex.wasm web/memo_regex.wasm web/rematch.wasm web/re2c_regex.wasm \
               web/js web/python dist
BUILT       := build engines/rust/target engines/dotnet/bin engines/dotnet/obj engines/haskell/dist-newstyle \
               engines/zig/zig-out engines/zig/.zig-cache engines/python/__pycache__ engines/ocaml/*.cm* engines/java/target engines/swift/.build
TOOLCHAINS  := $(EMSDK) $(CARGO_HOME) $(RUSTUP_HOME) $(BOOST) $(OPAMROOT) go .dotnet .nim .nimble .zig .ldc .ghc-wasm \
               .jdk .maven .m2 .swift .swiftpm vendor/icu .pw-browsers .chromedeps .apt .npmcache .fccache fonts.conf e2e/node_modules .cache .local .nuget

clean:
	rm -rf $(WEB_OUT)
distclean: clean
	rm -rf $(BUILT)
deepclean: distclean
	chmod -R u+w $(TOOLCHAINS) 2>/dev/null || true   # rustup &c. install read-only dirs that block rm -rf
	rm -rf $(TOOLCHAINS)
