#include "../registry.h"
extern "C" {
#include "oniguruma.h"
}
namespace {
int g_init = 0;
EngineResult run(const std::string& pat, const std::string& in, OnigSyntaxType* syntax, OnigOptionType opt) {
  if (!g_init) { OnigEncoding e[1] = { ONIG_ENCODING_UTF8 }; onig_initialize(e, 1); g_init = 1; }
  regex_t* reg = nullptr; OnigErrorInfo einfo;
  const OnigUChar* p = (const OnigUChar*)pat.c_str();
  int rc = onig_new(&reg, p, p + pat.size(), opt, ONIG_ENCODING_UTF8, syntax, &einfo);
  if (rc != ONIG_NORMAL) { char b[ONIG_MAX_ERROR_MESSAGE_LEN]; onig_error_code_to_str((OnigUChar*)b, rc, &einfo); return badPattern(b); }
  OnigRegion* region = onig_region_new();
  auto _ = finally([&]{ onig_region_free(region, 1); onig_free(reg); });
  const OnigUChar* str = (const OnigUChar*)in.c_str(); const OnigUChar* end = str + in.size();
  int pos = onig_search(reg, str, end, str, end, region, ONIG_OPTION_NONE);
  if (pos >= 0)
    return okN(region->num_regs, [&](int i){ return region->beg[i] != ONIG_REGION_NOTPOS
          ? Span{ region->beg[i], region->end[i], true } : unmatched(); });
  if (pos == ONIG_MISMATCH) return noMatch();
  char b[ONIG_MAX_ERROR_MESSAGE_LEN]; onig_error_code_to_str((OnigUChar*)b, pos);
  if (pos == ONIGERR_RETRY_LIMIT_IN_MATCH_OVER || pos == ONIGERR_RETRY_LIMIT_IN_SEARCH_OVER || pos == ONIGERR_MATCH_STACK_LIMIT_OVER)
    return limitError(b);
  return matchError(b);
}
EngineResult perlng(const std::string& p, const std::string& s) { return run(p, s, ONIG_SYNTAX_PERL_NG, ONIG_OPTION_NONE); }
EngineResult posix(const std::string& p, const std::string& s)  { return run(p, s, ONIG_SYNTAX_POSIX_EXTENDED, ONIG_OPTION_FIND_LONGEST); }
}
REGISTER("oniguruma", "Oniguruma / Perl-NG", "Perl-NG", "Perl/PCRE", "6.9.10", "https://github.com/kkos/oniguruma", perlng);
REGISTER("oniguruma-posix", "Oniguruma / POSIX", "POSIX ERE", "POSIX", "6.9.10", "https://github.com/kkos/oniguruma", posix);
