#include "../registry.h"
#include <boost/xpressive/xpressive_dynamic.hpp>
namespace {
namespace xp = boost::xpressive;
EngineResult run(const std::string& pat, const std::string& in) {
  return guard([&]() -> EngineResult {
    xp::sregex re = xp::sregex::compile(pat,
      xp::regex_constants::single_line | xp::regex_constants::not_dot_newline);
    xp::smatch m;
    if (!xp::regex_search(in, m, re)) return noMatch();
    return okSmatch(m);
  });
}
}
REGISTER("xpressive", "Boost.Xpressive", "ECMAScript (dynamic)", "ECMAScript", "1.91.0", "https://www.boost.org/doc/libs/release/doc/html/xpressive.html", run);
