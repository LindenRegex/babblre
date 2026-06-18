#include "../registry.h"
extern "C" int memo_match(const char* pattern, const char* input, int* spans, int maxGroups);

namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  int spans[20];
  int n = memo_match(pat.c_str(), in.c_str(), spans, 10);
  if (n < 0) return badPattern("compile error");
  if (n == 0) return noMatch();
  return okN(n, [&](int i) { return spanOff(spans[2 * i], spans[2 * i + 1]); });
}
}
REGISTER("memo-regex", "memoized backtracking", "memoized backtracking (full)", "linear", "",
         "https://github.com/PurdueDualityLab/memoized-regex-engine", run);
