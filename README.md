# [Babblre](https://lin.den.re/babblre)

A [web playground](https://lin.den.re/babblre) that runs a given regex and string against *lots* of regex engines:

<!-- engine-list-begin -->

- `.NET`: [`backtracking`](https://learn.microsoft.com/dotnet/standard/base-types/regular-expressions), [`ECMAScript`](https://learn.microsoft.com/dotnet/standard/base-types/regular-expressions), [`NonBacktracking`](https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-options#nonbacktracking-mode), [`RightToLeft`](https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-options#right-to-left-mode)
- [`automata-lib`](https://github.com/caleb531/automata)
- `boost::regex`: [`grep`](https://www.boost.org/doc/libs/release/libs/regex/), [`Perl`](https://www.boost.org/doc/libs/release/libs/regex/), [`Perl-longest`](https://www.boost.org/doc/libs/release/libs/regex/), [`POSIX`](https://www.boost.org/doc/libs/release/libs/regex/)
- [`Boost.Xpressive`](https://www.boost.org/doc/libs/release/doc/html/xpressive.html)
- `Browser RegExp`: [`default`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp), [`u`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode), [`v`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets)
- [`CPython re`](https://docs.python.org/3/library/re.html)
- `dk.brics.automaton`: [`default`](https://www.brics.dk/automaton/), [`plain`](https://www.brics.dk/automaton/)
- `engine262`: [`default`](https://github.com/engine262/engine262), [`u`](https://github.com/engine262/engine262), [`v`](https://github.com/engine262/engine262)
- [`FAdo`](https://fado.dcc.fc.up.pt/)
- [`fancy-regex`](https://github.com/fancy-regex/fancy-regex)
- `GNU regex (glibc)`: [`awk`](https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html), [`Emacs`](https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html), [`ERE`](https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html), [`grep`](https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html)
- [`Go regexp`](https://pkg.go.dev/regexp)
- [`greenery`](https://github.com/qntm/greenery)
- `ICU`: [`default`](https://unicode-org.github.io/icu/userguide/strings/regexp.html), [`UWORD`](https://unicode-org.github.io/icu/userguide/strings/regexp.html)
- [`interegular`](https://github.com/MegaIng/interegular)
- [`java.util.regex (TeaVM)`](https://github.com/konsoletyper/teavm)
- [`lexertl17`](https://github.com/BenHanson/lexertl17)
- [`memoized backtracking`](https://github.com/PurdueDualityLab/memoized-regex-engine)
- `MinRX`: [`default`](https://github.com/mikehaertel/minrx), [`firstsub`](https://github.com/mikehaertel/minrx), [`minimal`](https://github.com/mikehaertel/minrx)
- [`MuJS`](https://mujs.com/)
- [`Nim regex`](https://github.com/nitely/nim-regex)
- [`NU-RE`](https://github.com/Bricktech2000/NU-RE)
- `OCaml Re`: [`Emacs`](https://github.com/ocaml/ocaml-re), [`PCRE`](https://github.com/ocaml/ocaml-re), [`PCRE-longest`](https://github.com/ocaml/ocaml-re), [`PCRE-shortest`](https://github.com/ocaml/ocaml-re), [`POSIX`](https://github.com/ocaml/ocaml-re)
- [`OCaml Str`](https://ocaml.org/manual/api/Str.html)
- `Oniguruma`: [`Perl-NG`](https://github.com/kkos/oniguruma), [`POSIX`](https://github.com/kkos/oniguruma), [`Ruby`](https://github.com/kkos/oniguruma)
- `PCRE1`: [`DFA`](https://www.pcre.org/original/doc/html/pcre_dfa_exec.html), [`Perl`](https://www.pcre.org/original/doc/html/), [`UTF`](https://www.pcre.org/original/doc/html/)
- `PCRE2`: [`DFA`](https://www.pcre.org/current/doc/html/pcre2_dfa_match.html), [`Perl`](https://www.pcre.org/), [`UTF`](https://www.pcre.org/)
- [`PIRE`](https://github.com/yandex/pire)
- [`Plan 9 libregexp`](https://9fans.github.io/plan9port/man/man7/regexp.html)
- [`POSIX regex (musl)`](https://musl.libc.org/)
- [`pyformlang`](https://github.com/Aunsiels/pyformlang)
- `QuickJS-ng`: [`default`](https://github.com/quickjs-ng/quickjs), [`u`](https://github.com/quickjs-ng/quickjs), [`v`](https://github.com/quickjs-ng/quickjs)
- [`RE/flex`](https://github.com/Genivia/RE-flex)
- `RE#`: [`.NET`](https://github.com/ieviev/resharp-dotnet), [`Rust`](https://github.com/ieviev/resharp)
- `re1`: [`backtrack VM`](https://swtch.com/~rsc/regexp/), [`Pike VM`](https://swtch.com/~rsc/regexp/), [`recursive`](https://swtch.com/~rsc/regexp/), [`recursive-loop`](https://swtch.com/~rsc/regexp/), [`Thompson NFA`](https://swtch.com/~rsc/regexp/)
- `RE2`: [`leftmost`](https://github.com/google/re2), [`leftmost-longest`](https://github.com/google/re2), [`POSIX`](https://github.com/google/re2)
- `re2c`: [`leftmost`](https://re2c.org/manual/manual_c.html), [`NFA`](https://re2c.org/manual/manual_c.html), [`TDFA`](https://re2c.org/manual/manual_c.html)
- [`re2js`](https://github.com/le0pard/re2js)
- [`RegElk`](https://github.com/epfl-systemf/RegElk)
- `regex (PyPI)`: [`Perl-NG`](https://github.com/mrabarnett/mrab-regex), [`POSIX`](https://github.com/mrabarnett/mrab-regex), [`V1`](https://github.com/mrabarnett/mrab-regex)
- [`regex-tdfa`](https://github.com/haskell-hvr/regex-tdfa)
- `regexp2`: [`default`](https://github.com/dlclark/regexp2), [`RTL`](https://github.com/dlclark/regexp2)
- `regress`: [`default`](https://github.com/ridiculousfish/regress), [`u`](https://github.com/ridiculousfish/regress), [`v`](https://github.com/ridiculousfish/regress)
- [`REmatch`](https://github.com/REmatchChile/REmatch)
- [`Remimu`](https://github.com/wareya/Remimu)
- `rust regex`: [`default`](https://github.com/rust-lang/regex), [`ASCII`](https://github.com/rust-lang/regex), [`swap-greed`](https://github.com/rust-lang/regex)
- [`rust regex-lite`](https://docs.rs/regex-lite)
- [`SLRE`](https://github.com/cesanta/slre)
- [`Spencer regex`](https://github.com/garyhouston/rxspencer)
- `sregex`: [`Pike VM`](https://github.com/openresty/sregex), [`Thompson`](https://github.com/openresty/sregex)
- `SRELL`: [`default`](https://www.akenotsuki.com/misc/srell/en/), [`u`](https://www.akenotsuki.com/misc/srell/en/), [`v`](https://www.akenotsuki.com/misc/srell/en/)
- `std::regex`: [`awk`](https://en.cppreference.com/w/cpp/regex), [`ECMAScript`](https://en.cppreference.com/w/cpp/regex), [`grep`](https://en.cppreference.com/w/cpp/regex), [`POSIX`](https://en.cppreference.com/w/cpp/regex)
- [`subreg`](https://github.com/mattbucknall/subreg)
- [`Swift Regex`](https://developer.apple.com/documentation/swift/regex)
- [`T-Rex`](https://github.com/kimperator/T-Rex)
- [`tiny-regex (matp)`](https://github.com/matp/tiny-regex)
- [`tiny-regex-c`](https://github.com/kokke/tiny-regex-c)
- [`TinyRE`](https://github.com/khchen/tinyre)
- `TRE`: [`backtracking`](https://github.com/laurikari/tre), [`exact`](https://github.com/laurikari/tre), [`fuzzy`](https://github.com/laurikari/tre), [`ungreedy`](https://github.com/laurikari/tre)
- [`ximtech Regex`](https://github.com/ximtech/Regex)
- [`zig-regex`](https://github.com/tiehuis/zig-regex)

<!-- engine-list-end -->

## Setup

- **Fetch engine sources**: `make vendor-submodules`
- **Build locally**: `make all`
- **Serve locally**: `make serve`
- **Build with Docker**: `make dist-docker`
- **Run tests**: `make test`
- **Run browser tests**: `make test-ui`
- **Release**: `git tag vX.Y.Z && git push --tags`
- **Regenerate the engine list**: `make README.md`
