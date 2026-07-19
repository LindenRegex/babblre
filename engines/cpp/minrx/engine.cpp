#include "../registry.h"
#include "minrx.c"
namespace {
EngineResult run(const std::string& pat, const std::string& in, int cf, int ef) {
  minrx_regex_t rx;
  char err[256];
  int rc = minrx_regcomp(&rx, pat.c_str(), MINRX_REG_EXTENDED | MINRX_REG_EXTENSIONS_GNU | cf);
  if (rc != MINRX_REG_SUCCESS) { minrx_regerror(rc, &rx, err, sizeof err); return badPattern(err); }
  auto _ = finally([&]{ minrx_regfree(&rx); });
  size_t n = rx.re_nsub + 1;
  std::vector<minrx_regmatch_t> m(n);
  rc = minrx_regexec(&rx, in.c_str(), n, m.data(), ef);
  if (rc == MINRX_REG_NOMATCH) return noMatch();
  if (rc != MINRX_REG_SUCCESS) { minrx_regerror(rc, &rx, err, sizeof err); return matchError(err); }
  return okRegmatch(m);
}
EngineResult std2024(const std::string& p, const std::string& s)  { return run(p, s, 0, 0); }
EngineResult minimal(const std::string& p, const std::string& s)  { return run(p, s, MINRX_REG_MINIMAL, 0); }
EngineResult firstsub(const std::string& p, const std::string& s) { return run(p, s, 0, MINRX_REG_FIRSTSUB); }
}
REGISTER("minrx", "MinRX", "POSIX ERE (leftmost-longest, POSIX-2024)", "POSIX", "",
         "https://github.com/mikehaertel/minrx", std2024);
REGISTER("minrx-minimal", "MinRX / minimal", "POSIX-2024 REG_MINIMAL: quantifier greediness swapped", "POSIX", "",
         "https://github.com/mikehaertel/minrx", minimal);
REGISTER("minrx-firstsub", "MinRX / firstsub", "POSIX-2024 REG_FIRSTSUB: repeated groups keep the first capture", "POSIX", "",
         "https://github.com/mikehaertel/minrx", firstsub);
