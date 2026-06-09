#include "../registry.h"
#include <stdio.h>
#include <string.h>
#include <ctype.h>
namespace slrelib {
#include "slre.c"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  int rc = slrelib::slre_match(pat.c_str(), in.c_str(), (int)in.size(), NULL, 0, 0);
  if (rc == -1) return yesNo(false);
  return rc < 0 ? matchError("slre error") : yesNo(true);
}
}
REGISTER("slre", "SLRE", "accept/reject (search)", "other", "", "https://github.com/cesanta/slre", run);
