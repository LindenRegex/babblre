#include "../registry.h"
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <setjmp.h>
#include <stdlib.h>
namespace trexlib {
#include "trex.c"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  const char* err = nullptr;
  trexlib::TRex* x = trexlib::trex_compile(pat.c_str(), &err);
  if (!x) return badPattern(err ? err : "?");
  const char *b = nullptr, *e = nullptr;
  EngineResult r = trexlib::trex_search(x, in.c_str(), &b, &e)
    ? group0((int)(b - in.c_str()), (int)(e - in.c_str())) : noMatch();
  trexlib::trex_free(x);
  return r;
}
}
REGISTER("t-rex", "T-Rex", "group-0 (backtrack)", "other", "", "https://github.com/kimperator/T-Rex", run);
