#define _GNU_SOURCE 1
#include "../registry.h"
#include <cstring>
#include <cstdlib>
extern "C" {
#include "gnusrc/rename.h"
#include "gnusrc/regex.h"
}

namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  struct re_pattern_buffer buf; std::memset(&buf, 0, sizeof buf);
  re_syntax_options = RE_SYNTAX_POSIX_EXTENDED;
  const char* err = re_compile_pattern(pat.c_str(), pat.size(), &buf);
  if (err) return badPattern(err);
  struct re_registers regs; std::memset(&regs, 0, sizeof regs);
  auto _ = finally([&]{ gnu_regfree(&buf); std::free(regs.start); std::free(regs.end); });
  buf.regs_allocated = REGS_UNALLOCATED;
  int pos = re_search(&buf, in.c_str(), (int)in.size(), 0, (int)in.size(), &regs);
  if (pos == -2) return matchError("internal error");
  if (pos < 0) return noMatch();
  int ng = (int)buf.re_nsub + 1;
  if (ng > regs.num_regs) ng = regs.num_regs;
  return okN(ng, [&](int i){ return spanOff(regs.start[i], regs.end[i]); });
}
}
REGISTER("glibc", "GNU regex (glibc)", "POSIX ERE (GNU)", "POSIX", "gnulib ef75da0", "https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html", run);
