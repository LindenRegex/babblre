#include "../registry.h"
extern "C" {
struct RE;
RE* tinyre_compile(const char* pattern, int insensitive, int utf8);
const char** tinyre_match(RE* re, const char* s, int len, const char* cont);
int tinyre_max_matches(RE* re);                 // 2 * group count incl group 0
void tinyre_free(RE* re);
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  RE* re = tinyre_compile(pat.c_str(), 0, 1);
  if (!re) return badPattern("compile error");
  const char* base = in.c_str();
  const char** caps = tinyre_match(re, base, (int)in.size(), nullptr);
  EngineResult r = caps ? okN(tinyre_max_matches(re) / 2,
                              [&](int i) { return spanPtr(caps[2 * i], caps[2 * i + 1], base); })
                        : noMatch();
  tinyre_free(re);
  return r;
}
}
REGISTER("tinyre", "TinyRE", "Pike VM (full submatch)", "linear", "", "https://github.com/khchen/tinyre", run);
