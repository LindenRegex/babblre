#include "../registry.h"
#include <vector>
#define PCRE_STATIC
extern "C" {
#include "pcre.h"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  const char* err = nullptr; int erroff = 0;
  pcre* re = pcre_compile(pat.c_str(), 0, &err, &erroff, nullptr);
  if (!re) return badPattern(err ? err : "error");
  int ncap = 0; pcre_fullinfo(re, nullptr, PCRE_INFO_CAPTURECOUNT, &ncap); ncap += 1;
  std::vector<int> ov(ncap * 3);
  int rc = pcre_exec(re, nullptr, in.c_str(), (int)in.size(), 0, 0, ov.data(), ncap * 3);
  EngineResult r;
  if (rc == PCRE_ERROR_NOMATCH) r = noMatch();
  else if (rc == PCRE_ERROR_MATCHLIMIT || rc == PCRE_ERROR_RECURSIONLIMIT) r = limitError("match limit exceeded");
  else if (rc < 0) r = matchError("match error");
  else r = okN(ncap, [&](int i){ return spanOff(ov[2*i], ov[2*i+1]); });
  pcre_free(re);
  return r;
}
EngineResult dfa(const std::string& pat, const std::string& in) {
  const char* err = nullptr; int erroff = 0;
  pcre* re = pcre_compile(pat.c_str(), 0, &err, &erroff, nullptr);
  if (!re) return badPattern(err ? err : "error");
  int ov[90]; int wspace[1024];
  int rc = pcre_dfa_exec(re, nullptr, in.c_str(), (int)in.size(), 0, 0, ov, 90, wspace, 1024);
  EngineResult r;
  if (rc == PCRE_ERROR_NOMATCH) r = noMatch();
  else if (rc == PCRE_ERROR_DFA_WSSIZE) r = limitError("DFA workspace exceeded");
  else if (rc < 0) r = matchError("match error");
  else r = group0(ov[0], ov[1]);
  pcre_free(re);
  return r;
}
}
REGISTER("pcre1", "PCRE1 / Perl", "Perl/PCRE", "Perl/PCRE", "8.45", "https://www.pcre.org/original/doc/html/", run);
REGISTER("pcre1-dfa", "PCRE1 / DFA", "leftmost-longest, group-0", "linear", "8.45", "https://www.pcre.org/original/doc/html/pcre_dfa_exec.html", dfa);
