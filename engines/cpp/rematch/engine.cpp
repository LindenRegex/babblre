#include "../registry.h"
extern "C" int rematch_match(const char* pat, const char* input, int* span, char* err, int errcap);

namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  int span[2]; char err[256] = { 0 };
  int r = rematch_match(pat.c_str(), in.c_str(), span, err, sizeof err);
  if (r == 1) return group0(span[0], span[1]);
  if (r == 0) return noMatch();
  if (r == -1) return badPattern(err);
  if (r == -3) return limitError(err);
  return matchError(err);
}
}
REGISTER("rematch", "REmatch", "spanner (all-matches)", "linear", "",
         "https://github.com/REmatchChile/REmatch", run);
