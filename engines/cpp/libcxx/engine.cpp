#include "../registry.h"
#include <regex>

namespace {
EngineResult run(const std::string& p, const std::string& s, std::regex::flag_type fl) {
  return reSearch<std::regex, std::smatch>(p, s, fl);
}
EngineResult ecma(const std::string& p, const std::string& s)  { return run(p, s, std::regex::ECMAScript); }
EngineResult posix(const std::string& p, const std::string& s) { return run(p, s, std::regex::extended); }
EngineResult grep(const std::string& p, const std::string& s)  { return run(p, s, std::regex::grep); }
EngineResult awk(const std::string& p, const std::string& s)   { return run(p, s, std::regex::awk); }
}
REGISTER("std-ecma", "std::regex / ECMAScript", "ECMAScript", "ECMAScript", "", "https://en.cppreference.com/w/cpp/regex", ecma);
REGISTER("std-posix", "std::regex / POSIX", "POSIX ERE", "POSIX", "", "https://en.cppreference.com/w/cpp/regex", posix);
REGISTER("std-grep", "std::regex / grep", "POSIX BRE", "POSIX", "", "https://en.cppreference.com/w/cpp/regex", grep);
REGISTER("std-awk", "std::regex / awk", "awk", "POSIX", "", "https://en.cppreference.com/w/cpp/regex", awk);
