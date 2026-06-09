#include "../registry.h"
#include <vector>
#include <string>
extern "C" {
#include "csrc/shim.h"
jmp_buf re1_jmp;
#include "csrc/regexp.h"
}
namespace {
using Matcher = int (*)(Prog*, char*, char**, int);

EngineResult runFull(Matcher m, const std::string& pat, const std::string& in) {
  if (setjmp(re1_jmp)) return matchError("unsupported syntax / parse error");
  std::string p = pat;
  Prog* prog = compile(parse(&p[0]));
  int maxn = 1;  // group g uses Save slots 2g and 2g+1
  for (int i = 0; i < prog->len; ++i)
    if (prog->start[i].opcode == Save && prog->start[i].n > maxn) maxn = prog->start[i].n;
  int ng = (maxn + 1) / 2;
  if (ng > MAXSUB / 2) ng = MAXSUB / 2;  // re1 Sub.sub[MAXSUB] hard cap
  std::vector<char*> sub(2 * ng, nullptr);
  std::vector<char> input(in.begin(), in.end()); input.push_back('\0');
  if (setjmp(re1_jmp)) return limitError("backtrack overflow");
  if (!m(prog, input.data(), sub.data(), 2 * ng)) return noMatch();
  char* base = input.data();
  return okN(ng, [&](int g){ return spanPtr(sub[2 * g], sub[2 * g + 1], base); });
}
EngineResult runBool(Matcher m, const std::string& pat, const std::string& in) {
  if (setjmp(re1_jmp)) return matchError("unsupported syntax / parse error");
  std::string p = pat;
  Prog* prog = compile(parse(&p[0]));
  char* sub[MAXSUB] = { 0 };
  std::vector<char> input(in.begin(), in.end()); input.push_back('\0');
  if (setjmp(re1_jmp)) return limitError("backtrack overflow");
  return yesNo(m(prog, input.data(), sub, MAXSUB) != 0);
}
EngineResult run_rec(const std::string& p, const std::string& s)  { return runFull(recursiveprog, p, s); }
EngineResult run_bt(const std::string& p, const std::string& s)   { return runFull(backtrack, p, s); }
EngineResult run_pike(const std::string& p, const std::string& s) { return runFull(pikevm, p, s); }
EngineResult run_recloop(const std::string& p, const std::string& s) { return runFull(recursiveloopprog, p, s); }
EngineResult run_thom(const std::string& p, const std::string& s) { return runBool(thompsonvm, p, s); }
}
REGISTER("re1-recursive", "re1 / recursive", "backtracking", "other", "", "https://swtch.com/~rsc/regexp/", run_rec);
REGISTER("re1-backtrack", "re1 / backtrack VM", "backtracking", "other", "", "https://swtch.com/~rsc/regexp/", run_bt);
REGISTER("re1-pike", "re1 / Pike VM", "linear", "linear", "", "https://swtch.com/~rsc/regexp/", run_pike);
REGISTER("re1-recursiveloop", "re1 / recursive-loop", "backtracking", "other", "", "https://swtch.com/~rsc/regexp/", run_recloop);
REGISTER("re1-thompson", "re1 / Thompson NFA", "linear", "linear", "", "https://swtch.com/~rsc/regexp/", run_thom);
