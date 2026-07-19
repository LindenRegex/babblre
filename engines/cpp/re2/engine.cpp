#include "../registry.h"
#include <re2/re2.h>
#include <vector>

namespace {
EngineResult run(const std::string& pat, const std::string& in, bool longest, bool posix = false) {
  RE2::Options opt; opt.set_log_errors(false); opt.set_longest_match(longest); opt.set_posix_syntax(posix); opt.set_one_line(posix);
  RE2 re(pat, opt);
  if (!re.ok()) return re.error_code() == RE2::ErrorPatternTooLarge ? limitError(re.error()) : badPattern(re.error());
  const int n = re.NumberOfCapturingGroups();
  std::vector<re2::StringPiece> g(n + 1);
  if (!re.Match(in, 0, in.size(), RE2::UNANCHORED, g.data(), n + 1)) return noMatch();
  return okN(n + 1, [&](int i){ return spanPtr(g[i].data(), g[i].data() + g[i].size(), in.data()); });
}
EngineResult leftmost(const std::string& p, const std::string& s) { return run(p, s, false); }
EngineResult longest(const std::string& p, const std::string& s)  { return run(p, s, true); }
EngineResult posix(const std::string& p, const std::string& s)    { return run(p, s, true, true); }
}
REGISTER("re2", "RE2 / leftmost", "linear", "linear", "2025-11-05", "https://github.com/google/re2", leftmost);
REGISTER("re2-longest", "RE2 / leftmost-longest", "linear", "linear", "2025-11-05", "https://github.com/google/re2", longest);
REGISTER("re2-posix", "RE2 / POSIX", "posix_syntax, leftmost-longest", "POSIX", "2025-11-05", "https://github.com/google/re2", posix);
