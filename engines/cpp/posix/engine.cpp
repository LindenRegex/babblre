#include "../registry.h"
#include <regex.h>
#include <vector>

namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  regex_t re;
  int rc = regcomp(&re, pat.c_str(), REG_EXTENDED);
  if (rc) { char b[256]; regerror(rc, &re, b, sizeof b); return badPattern(b); }
  auto _ = finally([&]{ regfree(&re); });
  std::size_t n = re.re_nsub + 1;
  std::vector<regmatch_t> m(n);
  return regexec(&re, in.c_str(), n, m.data(), 0) == 0 ? okRegmatch(m) : noMatch();
}
}
REGISTER("musl-posix", "POSIX regex (musl)", "POSIX", "POSIX", "", "https://musl.libc.org/", run);
