#include "../registry.h"
#define REMIMU_LOG_ERROR(x) ((void)0)
#include "remimu.h"
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  RegexToken toks[1024];
  int16_t n = 1024;
  if (regex_parse(pat.c_str(), toks, &n, 0) != 0) return badPattern("parse error");
  const char* s = in.c_str();
  const int len = (int)in.size();
  int64_t cpos[1024], cspan[1024];
  for (int start = 0; start <= len; ++start) {
    for (int i = 0; i < 1024; ++i) { cpos[i] = -1; cspan[i] = -1; }
    int64_t r = regex_match(toks, s, (size_t)start, 1024, cpos, cspan);
    if (r == -3) return badPattern("invalid pattern");
    if (r == -2) return limitError("too complex");
    if (r >= 0) {
      int ng = 1;
      for (int t = 0; t < n; ++t) if (toks[t].kind == REMIMU_KIND_OPEN) ++ng;
      if (ng > 1024) ng = 1024;
      if (cpos[0] < 0) return group0(start, (int)r);
      return okN(ng, [&](int i) {
        return cpos[i] >= 0 ? Span{ (int)cpos[i], (int)(cpos[i] + cspan[i]), true } : unmatched();
      });
    }
  }
  return noMatch();
}
}
REGISTER("remimu", "Remimu", "backtracking (possessive/atomic)", "Perl/PCRE", "",
         "https://github.com/wareya/Remimu", run);
