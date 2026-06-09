#include "../registry.h"
#include <stddef.h>
namespace subreglib {
#include "subreg.c"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  int rc = subreglib::subreg_match(pat.c_str(), in.c_str(), NULL, 0, 64);
  if (rc == SUBREG_RESULT_MAX_DEPTH_EXCEEDED) return limitError("max depth exceeded");
  return rc < 0 ? matchError("subreg error") : yesNo(rc > 0);
}
}
REGISTER("subreg", "subreg", "accept/reject (anchored)", "other", "", "https://github.com/mattbucknall/subreg", run);
