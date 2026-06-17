#include "../registry.h"
#include <reflex/matcher.h>
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  try {
    reflex::Pattern p(reflex::Matcher::convert(pat, reflex::convert_flag::none));
    reflex::Matcher m(p, in, "N");
    return m.find() ? group0((int)m.first(), (int)m.last()) : noMatch();
  } catch (const reflex::regex_error& e) {
    bool lim = e.code() == reflex::regex_error::exceeds_length || e.code() == reflex::regex_error::exceeds_limits;
    return lim ? limitError(e.what()) : badPattern(e.what());
  } catch (const std::exception& e) { return badPattern(e.what()); }
}
}
REGISTER("reflex", "RE/flex", "lazy DFA (group-0)", "linear", "", "https://github.com/Genivia/RE-flex", run);
