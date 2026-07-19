#include "../registry.h"
#include "srell.hpp"

namespace {
template <class Rx, class Mt>
EngineResult runT(const std::string& p, const std::string& s, srell::regex_constants::syntax_option_type fl) {
  try {
    Rx re(p, fl); Mt m;
    return srell::regex_search(s, m, re) ? okSmatch(m) : noMatch();
  } catch (const srell::regex_error& e) {
    bool lim = e.code() == srell::regex_constants::error_complexity || e.code() == srell::regex_constants::error_stack;
    return lim ? limitError(std::string("complexity: ") + e.what()) : matchError(e.what());
  } catch (const std::exception& e) { return matchError(e.what()); }
  catch (...) { return matchError("error"); }
}
EngineResult run(const std::string& p, const std::string& s)  { return runT<srell::regex, srell::smatch>(p, s, srell::regex_constants::ECMAScript); }
EngineResult runU(const std::string& p, const std::string& s) { return runT<srell::u8cregex, srell::u8csmatch>(p, s, srell::regex_constants::ECMAScript); }
EngineResult runV(const std::string& p, const std::string& s) { return runT<srell::u8cregex, srell::u8csmatch>(p, s, srell::regex_constants::ECMAScript | srell::regex_constants::unicodesets); }
}
REGISTER("srell", "SRELL", "ECMAScript", "ECMAScript", "4.130", "https://www.akenotsuki.com/misc/srell/en/", run);
REGISTER("srell-u", "SRELL / u", "ECMAScript, unicode (UTF-8)", "ECMAScript", "4.130", "https://www.akenotsuki.com/misc/srell/en/", runU);
REGISTER("srell-v", "SRELL / v", "ECMAScript, unicodeSets (UTF-8)", "ECMAScript", "4.130", "https://www.akenotsuki.com/misc/srell/en/", runV);
