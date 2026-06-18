#include "../registry.h"
extern "C" int nure_run(const char* pattern, const char* input);
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  int r = nure_run(pat.c_str(), in.c_str());
  if (r < 0) return badPattern("parse error");
  return yesNo(r == 1);
}
}
REGISTER("nu-re", "NU-RE", "derivatives, intersection/complement (accept/reject)", "other", "",
         "https://github.com/Bricktech2000/NU-RE", run);
