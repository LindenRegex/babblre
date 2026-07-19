#define _GNU_SOURCE 1
#include "../registry.h"
#include <cstring>
#include <cstdlib>
extern "C" {
#include "gnusrc/rename.h"
#include "gnusrc/regex.h"
}

namespace {
EngineResult run(const std::string& pat, const std::string& in, reg_syntax_t syntax) {
  struct re_pattern_buffer buf; std::memset(&buf, 0, sizeof buf);
  re_syntax_options = syntax;
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
EngineResult ere(const std::string& p, const std::string& s)   { return run(p, s, RE_SYNTAX_POSIX_EXTENDED); }
EngineResult emacs(const std::string& p, const std::string& s) { return run(p, s, RE_SYNTAX_EMACS); }
EngineResult grep(const std::string& p, const std::string& s)  { return run(p, s, RE_SYNTAX_GREP); }
EngineResult awk(const std::string& p, const std::string& s)   { return run(p, s, RE_SYNTAX_AWK); }
}
REGISTER("glibc", "GNU regex (glibc) / ERE", "POSIX ERE (GNU)", "POSIX", "gnulib ef75da0", "https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html", ere);
REGISTER("glibc-emacs", "GNU regex (glibc) / Emacs", "Emacs", "Emacs", "gnulib ef75da0", "https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html", emacs);
REGISTER("glibc-grep", "GNU regex (glibc) / grep", "grep BRE", "POSIX", "gnulib ef75da0", "https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html", grep);
REGISTER("glibc-awk", "GNU regex (glibc) / awk", "awk ERE", "POSIX", "gnulib ef75da0", "https://www.gnu.org/software/libc/manual/html_node/Regular-Expressions.html", awk);
