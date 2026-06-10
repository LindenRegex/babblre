#include "../registry.h"
#define PIRE_NO_CONFIG
#include <pire/easy.h>

namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  try { Pire::Regexp re(pat, Pire::UTF8); return yesNo(re.Matches(in.c_str(), in.c_str() + in.size())); }
  catch (const std::exception& e) { return badPattern(e.what()); }
  catch (...) { return matchError("invalid pattern"); }
}
}
REGISTER("pire", "PIRE", "accept/reject (DFA search)", "other", "0.0.6", "https://github.com/yandex/pire", run);
