#include "../registry.h"
#include <cstring>
#include <vector>
extern "C" {
#include "regexp.h"
}

namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  const char* err = nullptr;
  Reprog* prog = js_regcomp(pat.c_str(), 0, &err);
  if (!prog) return badPattern(err ? err : "compile error");
  Resub m;
  EngineResult r;
  int rc = js_regexec(prog, in.c_str(), &m, 0);
  if (rc == 0) {
    const char* base = in.c_str();
    r = okN(m.nsub, [&](int i){ return spanPtr<const char*>(m.sub[i].sp, m.sub[i].ep, base); });
  } else if (rc < 0) r = limitError("recursion depth limit");
  else r = noMatch();
  js_regfree(prog);
  return r;
}
}
REGISTER("mujs", "MuJS", "ECMAScript", "ECMAScript", "1.3.7", "https://mujs.com/", run);
