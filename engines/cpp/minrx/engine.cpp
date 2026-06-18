#include "../registry.h"
#include "minrx.c"
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  minrx_regex_t rx;
  char err[256];
  int rc = minrx_regcomp(&rx, pat.c_str(), MINRX_REG_EXTENDED | MINRX_REG_EXTENSIONS_GNU);
  if (rc != MINRX_REG_SUCCESS) { minrx_regerror(rc, &rx, err, sizeof err); return badPattern(err); }
  auto _ = finally([&]{ minrx_regfree(&rx); });
  size_t n = rx.re_nsub + 1;
  std::vector<minrx_regmatch_t> m(n);
  rc = minrx_regexec(&rx, in.c_str(), n, m.data(), 0);
  if (rc == MINRX_REG_NOMATCH) return noMatch();
  if (rc != MINRX_REG_SUCCESS) { minrx_regerror(rc, &rx, err, sizeof err); return matchError(err); }
  return okRegmatch(m);
}
}
REGISTER("minrx", "MinRX", "POSIX ERE (leftmost-longest, POSIX-2024)", "POSIX", "",
         "https://github.com/mikehaertel/minrx", run);
