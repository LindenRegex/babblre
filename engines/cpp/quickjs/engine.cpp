#include "../registry.h"
#include <cstdlib>
#include <cstring>
#include <cstdint>
#include <vector>
extern "C" {
#include "libregexp.h"
size_t qjs_utf8_to_utf16(const char* src, size_t src_len, uint16_t* dest, size_t dest_len);
size_t qjs_utf16_to_cesu8(const uint16_t* src, size_t n, char* dest);
}
extern "C" bool lre_check_stack_overflow(void*, size_t) { return false; }
extern "C" int  lre_check_timeout(void*) { return 0; }
extern "C" void* lre_realloc(void*, void* ptr, size_t size) { return std::realloc(ptr, size); }

namespace {
EngineResult run(const std::string& pat, const std::string& in, int flags) {
  // quickjs.c hands lre_compile CESU-8 for every regex except /u
  std::string p = pat;
  if (!(flags & LRE_FLAG_UNICODE)) {
    size_t nu = qjs_utf8_to_utf16(pat.data(), pat.size(), nullptr, 0);
    std::vector<uint16_t> u(nu + 1);
    qjs_utf8_to_utf16(pat.data(), pat.size(), u.data(), nu);
    p.assign(nu * 3, '\0');
    p.resize(qjs_utf16_to_cesu8(u.data(), nu, &p[0]));
  }
  char err[128] = ""; int bclen = 0;
  uint8_t* bc = lre_compile(&bclen, err, sizeof err, p.c_str(), p.size(), flags, nullptr);
  if (!bc) return badPattern(err);
  int ncap = lre_get_capture_count(bc);
  std::vector<uint8_t*> cap(2 * ncap, nullptr);
  // lre_compile decodes the pattern as UTF-8, but cbuf_type 0 reads the subject as raw
  // bytes; pass UTF-16 instead (cbuf_type 1 = non-/u semantics, offsets in UTF-16 code
  // units — see web/units.js)
  size_t n16 = qjs_utf8_to_utf16(in.data(), in.size(), nullptr, 0);
  std::vector<uint16_t> u16(n16 + 1);   // +1 keeps data() non-null for empty input
  qjs_utf8_to_utf16(in.data(), in.size(), u16.data(), n16);
  const uint8_t* cbuf = (const uint8_t*)u16.data();
  int rc = lre_exec(cap.data(), bc, cbuf, 0, (int)n16, 1, nullptr);
  EngineResult r;
  if (rc == 1) r = okN(ncap, [&](int i){ return (cap[2*i] && cap[2*i+1])
      ? Span{ (int)((cap[2*i] - cbuf) / 2), (int)((cap[2*i+1] - cbuf) / 2), true } : unmatched(); });
  else r = (rc < 0) ? matchError("match error") : noMatch();
  std::free(bc);
  return r;
}
EngineResult legacy(const std::string& p, const std::string& s) { return run(p, s, 0); }
EngineResult uni(const std::string& p, const std::string& s)    { return run(p, s, LRE_FLAG_UNICODE); }
EngineResult uniSets(const std::string& p, const std::string& s){ return run(p, s, LRE_FLAG_UNICODE_SETS); }
}
REGISTER("quickjs", "QuickJS-ng", "ECMAScript", "ECMAScript", "0.15.1", "https://github.com/quickjs-ng/quickjs", legacy);
REGISTER("quickjs-u", "QuickJS-ng / u", "ECMAScript, unicode", "ECMAScript", "0.15.1", "https://github.com/quickjs-ng/quickjs", uni);
REGISTER("quickjs-v", "QuickJS-ng / v", "ECMAScript, unicodeSets", "ECMAScript", "0.15.1", "https://github.com/quickjs-ng/quickjs", uniSets);
