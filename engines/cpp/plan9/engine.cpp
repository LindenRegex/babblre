#include "../registry.h"
#include <cstdio>
#include <cstring>
#include <vector>
// Resub layout must match the library exactly
extern "C" {
struct Reprog;
struct Resub { union { char* sp; unsigned* rsp; } s; union { char* ep; unsigned* rep; } e; };
Reprog* regcomp9(char*);
int     regexec9(Reprog*, char*, Resub*, int);
void    regerror9(char*);
int     plan9_ngroups(Reprog*);
}

static char g_p9err[256];
extern "C" void regerror9(char* s) { std::snprintf(g_p9err, sizeof g_p9err, "%s", s ? s : "error"); }

namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  g_p9err[0] = 0;
  Reprog* prog = regcomp9((char*)pat.c_str());
  if (!prog) return badPattern(g_p9err[0] ? g_p9err : "syntax error");
  const int n = plan9_ngroups(prog) + 1;
  std::vector<Resub> m(n);
  std::memset(m.data(), 0, m.size() * sizeof(Resub));
  int rc = regexec9(prog, (char*)in.c_str(), m.data(), n);
  EngineResult r;
  if (rc < 0) r = limitError("ran out of thread-list space");
  else if (rc == 0) r = noMatch();
  else {
    const char* base = in.c_str();
    r = okN(n, [&](int i){ return m[i].s.sp ? Span{ (int)(m[i].s.sp - base), (int)(m[i].e.ep - base), true }
                                            : unmatched(); });
  }
  free(prog);
  return r;
}
}
REGISTER("plan9", "Plan 9 libregexp", "leftmost (Pike VM)", "linear", "", "https://9fans.github.io/plan9port/man/man7/regexp.html", run);
