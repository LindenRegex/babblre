#include "../registry.h"
// Rename regexCompile so it cannot collide with matp
#define regexCompile xim_regexCompile
extern "C" {
#include "Regex.h"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  Regex rx;
  regexCompile(&rx, pat.c_str());
  if (!rx.isPatternValid) return matchError(rx.errorMessage ? rx.errorMessage : "invalid pattern");
  Matcher m = regexMatch(&rx, in.c_str());
  return m.isFound ? group0((int)m.foundAtIndex, (int)(m.foundAtIndex + m.matchLength)) : noMatch();
}
}
REGISTER("ximtech", "ximtech Regex", "group-0 (backtrack)", "other", "", "https://github.com/ximtech/Regex", run);
