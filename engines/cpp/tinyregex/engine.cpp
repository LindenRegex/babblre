#include "../registry.h"
#include <stdio.h>     // pre-include so re.c system headers are guard-skipped not namespaced
#include <ctype.h>
namespace trc {
#include "re.c"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  int len = 0;
  int idx = trc::re_match(pat.c_str(), in.c_str(), &len);
  return idx >= 0 ? group0(idx, idx + len) : noMatch();
}
}
REGISTER("tiny-regex-c", "tiny-regex-c", "group-0 (backtrack)", "other", "", "https://github.com/kokke/tiny-regex-c", run);
