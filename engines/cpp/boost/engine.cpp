#include "../registry.h"
#include <boost/regex.hpp>

namespace {
EngineResult run(const std::string& p, const std::string& s, boost::regex::flag_type fl,
                 boost::regex_constants::match_flag_type mf = boost::regex_constants::match_default) {
  try {
    boost::regex re(p, fl); boost::smatch m;
    return regex_search(s, m, re, mf) ? okSmatch(m) : noMatch();
  } catch (const boost::regex_error& e) {
    bool lim = e.code() == boost::regex_constants::error_complexity || e.code() == boost::regex_constants::error_stack;
    return lim ? limitError(std::string("complexity: ") + e.what()) : matchError(e.what());
  } catch (const std::exception& e) { return matchError(e.what()); }
  catch (...) { return matchError("error"); }
}
EngineResult perl(const std::string& p, const std::string& s)  { return run(p, s, boost::regex::perl); }
EngineResult posix(const std::string& p, const std::string& s) { return run(p, s, boost::regex::extended, boost::regex_constants::match_single_line); }
EngineResult grep(const std::string& p, const std::string& s)  { return run(p, s, boost::regex::grep); }
}
REGISTER("boost-pcre", "boost::regex / Perl", "Perl/PCRE", "Perl/PCRE", "1.91.0", "https://www.boost.org/doc/libs/release/libs/regex/", perl);
REGISTER("boost-posix", "boost::regex / POSIX", "POSIX ERE", "POSIX", "1.91.0", "https://www.boost.org/doc/libs/release/libs/regex/", posix);
REGISTER("boost-grep", "boost::regex / grep", "POSIX BRE", "POSIX", "1.91.0", "https://www.boost.org/doc/libs/release/libs/regex/", grep);
