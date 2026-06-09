#include "../registry.h"
#include <vector>
#include <sys/types.h>
#include <stddef.h>
#define regcomp  sp_regcomp
#define regexec  sp_regexec
#define regerror sp_regerror
#define regfree  sp_regfree
extern "C" {
#include "csrc/regex.h"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  regex_t re;
  int rc = regcomp(&re, pat.c_str(), REG_EXTENDED);
  if (rc) { char b[256]; regerror(rc, &re, b, sizeof b); return badPattern(b); }
  auto _ = finally([&]{ regfree(&re); });
  std::size_t n = re.re_nsub + 1;
  std::vector<regmatch_t> m(n);
  // keep inline loop, okRegmatch mis-sizes rxspencer 64-bit off_t regmatch_t
  return regexec(&re, in.c_str(), n, m.data(), 0) == 0
    ? okN((int)n, [&](int i){ return spanOff(m[i].rm_so, m[i].rm_eo); }) : noMatch();
}
}
REGISTER("rxspencer", "Spencer regex", "POSIX (Spencer)", "POSIX", "", "https://github.com/garyhouston/rxspencer", run);
