#include "../registry.h"
#include "srell.hpp"

namespace {
EngineResult run(const std::string& p, const std::string& s) {
  try {
    srell::regex re(p); srell::smatch m;
    return srell::regex_search(s, m, re) ? okSmatch(m) : noMatch();
  } catch (const srell::regex_error& e) {
    bool lim = e.code() == srell::regex_constants::error_complexity || e.code() == srell::regex_constants::error_stack;
    return lim ? limitError(std::string("complexity: ") + e.what()) : matchError(e.what());
  } catch (const std::exception& e) { return matchError(e.what()); }
  catch (...) { return matchError("error"); }
}
}
REGISTER("srell", "SRELL", "ECMAScript", "ECMAScript", "4.130", "https://www.akenotsuki.com/misc/srell/en/", run);
