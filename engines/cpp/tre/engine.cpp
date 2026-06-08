#include "../registry.h"
#include <vector>
extern "C" {
// Include by full path so sibling local_includes/regex.h does not shadow musl <regex.h>
#include "../../../vendor/tre/local_includes/tre.h"
}
namespace {
EngineResult common(const std::string& pat, const std::string& in, bool fuzzy) {
  regex_t re;
  int rc = tre_regcomp(&re, pat.c_str(), REG_EXTENDED);
  if (rc) { char b[256]; tre_regerror(rc, &re, b, sizeof b); return badPattern(b); }
  auto _ = finally([&]{ tre_regfree(&re); });
  std::size_t n = re.re_nsub + 1;
  std::vector<regmatch_t> m(n);
  bool matched;
  if (fuzzy) {
    regaparams_t ap; tre_regaparams_default(&ap); ap.max_cost = 1;
    regamatch_t am; am.nmatch = n; am.pmatch = m.data();
    matched = tre_regaexec(&re, in.c_str(), &am, ap, 0) == 0;
  } else {
    matched = tre_regexec(&re, in.c_str(), n, m.data(), 0) == 0;
  }
  return matched ? okRegmatch(m) : noMatch();
}
EngineResult exact(const std::string& p, const std::string& s) { return common(p, s, false); }
EngineResult fuzzy(const std::string& p, const std::string& s) { return common(p, s, true); }
}
REGISTER("tre", "TRE / exact", "POSIX", "POSIX", "0.9.0", "https://github.com/laurikari/tre", exact);
REGISTER("tre-fuzzy", "TRE / fuzzy", "POSIX (cost≤1)", "other", "0.9.0", "https://github.com/laurikari/tre", fuzzy);
