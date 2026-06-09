#include "../registry.h"
extern "C" {
#include "regex_compile.h"
#include "regex_vm_pike.h"
}
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  RegexProgram* prog = regexCompile(pat.c_str());
  if (!prog) return matchError("invalid pattern");
  int maxSlot = 1;                                    // group g uses SAVE slots 2g and 2g+1
  for (int i = 0; i < prog->ninstructions; ++i)
    if (prog->instructions[i].opcode == REGEX_PROGRAM_OPCODE_SAVE && prog->instructions[i].save > maxSlot)
      maxSlot = prog->instructions[i].save;
  int ng = (maxSlot + 1) / 2;
  if (ng > REGEX_VM_PIKE_MAX_MATCHES / 2) ng = REGEX_VM_PIKE_MAX_MATCHES / 2;
  std::vector<const char*> m(2 * ng, nullptr);
  EngineResult r;
  if (regexVmPikeRun(prog, in.c_str(), m.data(), 2 * ng))
    r = okN(ng, [&](int g){ return spanPtr<const char*>(m[2*g], m[2*g+1], in.c_str()); });
  else r = noMatch();
  regexCompileFree(prog);
  return r;
}
}
REGISTER("matp", "tiny-regex (matp)", "Pike VM (submatch)", "linear", "", "https://github.com/matp/tiny-regex", run);
