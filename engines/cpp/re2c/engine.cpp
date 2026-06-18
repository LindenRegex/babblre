#include "../registry.h"
#include "regex.h"
namespace {
EngineResult run_flags(const std::string& pat, const std::string& in, int flags) {
  regex_t preg;
  if (regcomp(&preg, pat.c_str(), REG_EXTENDED | flags) != 0) return badPattern("compile error");
  auto _ = finally([&]{ regfree(&preg); });
  size_t ng = preg.re_nsub ? preg.re_nsub : 1;
  std::vector<regmatch_t> m(ng);
  const char* s = in.c_str();
  const int len = (int)in.size();
  for (int start = 0; start <= len; ++start) {
    for (auto& x : m) { x.rm_so = -1; x.rm_eo = -1; }
    int rc = regexec(&preg, s + start, ng, m.data(), start ? REG_NOTBOL : 0);
    if (rc == 0)
      return okN((int)ng, [&](int i) {
        return m[i].rm_so < 0 ? unmatched()
                              : Span{ (int)(m[i].rm_so + start), (int)(m[i].rm_eo + start), true };
      });
    if (rc != REG_NOMATCH) return matchError("exec error");
  }
  return noMatch();
}
EngineResult tdfa(const std::string& p, const std::string& s)     { return run_flags(p, s, 0); }
EngineResult nfa(const std::string& p, const std::string& s)      { return run_flags(p, s, REG_NFA); }
EngineResult leftmost(const std::string& p, const std::string& s) { return run_flags(p, s, REG_NFA | REG_LEFTMOST); }
}
REGISTER("re2c-tdfa",     "re2c / TDFA",     "lookahead TDFA (POSIX longest)", "POSIX",  "", "https://re2c.org/manual/manual_c.html", tdfa);
REGISTER("re2c-nfa",      "re2c / NFA",      "Okui-Suzuki NFA (POSIX longest)", "POSIX", "", "https://re2c.org/manual/manual_c.html", nfa);
REGISTER("re2c-leftmost", "re2c / leftmost", "leftmost-greedy submatch",        "linear", "", "https://re2c.org/manual/manual_c.html", leftmost);
