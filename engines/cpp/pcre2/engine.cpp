#include "../registry.h"
#define PCRE2_CODE_UNIT_WIDTH 8
#include <pcre2.h>
#include <cstdint>

namespace {
std::string pcre2err(int code) { PCRE2_UCHAR b[256]; pcre2_get_error_message(code, b, sizeof b); return (const char*)b; }
bool isLimit(int rc) {
  switch (rc) {
    case PCRE2_ERROR_MATCHLIMIT: case PCRE2_ERROR_DEPTHLIMIT: case PCRE2_ERROR_HEAPLIMIT:
    case PCRE2_ERROR_DFA_WSSIZE: case PCRE2_ERROR_DFA_RECURSE: return true;
    default: return false;   // DFA_UITEM &c. are unsupported-pattern errors, not limits
  }
}
EngineResult negError(int rc) {
  return isLimit(rc) ? limitError("limit: " + pcre2err(rc)) : matchError(pcre2err(rc));
}
EngineResult run(const std::string& pat, const std::string& in, uint32_t co) {
  int ec; PCRE2_SIZE eo;
  pcre2_code* re = pcre2_compile((PCRE2_SPTR)pat.c_str(), pat.size(), co, &ec, &eo, nullptr);
  if (!re) return badPattern(pcre2err(ec));
  pcre2_match_data* md = pcre2_match_data_create_from_pattern(re, nullptr);
  auto _ = finally([&]{ pcre2_match_data_free(md); pcre2_code_free(re); });
  int rc = pcre2_match(re, (PCRE2_SPTR)in.c_str(), in.size(), 0, 0, md, nullptr);
  if (rc == PCRE2_ERROR_NOMATCH) return noMatch();
  if (rc < 0) return negError(rc);
  uint32_t ng = 0; pcre2_pattern_info(re, PCRE2_INFO_CAPTURECOUNT, &ng); ng += 1;
  PCRE2_SIZE* ov = pcre2_get_ovector_pointer(md);
  return okN((int)ng, [&](int i){ return ov[2*i] == PCRE2_UNSET ? unmatched() : Span{ (int)ov[2*i], (int)ov[2*i+1], true }; });
}
EngineResult dfa(const std::string& pat, const std::string& in) {
  int ec; PCRE2_SIZE eo;
  pcre2_code* re = pcre2_compile((PCRE2_SPTR)pat.c_str(), pat.size(), 0, &ec, &eo, nullptr);
  if (!re) return badPattern(pcre2err(ec));
  pcre2_match_data* md = pcre2_match_data_create(32, nullptr);
  auto _ = finally([&]{ pcre2_match_data_free(md); pcre2_code_free(re); });
  int wspace[1024];
  int rc = pcre2_dfa_match(re, (PCRE2_SPTR)in.c_str(), in.size(), 0, 0, md, nullptr, wspace, 1024);
  if (rc == PCRE2_ERROR_NOMATCH) return noMatch();
  if (rc < 0) return negError(rc);
  PCRE2_SIZE* ov = pcre2_get_ovector_pointer(md);
  return group0((int)ov[0], (int)ov[1]);
}
EngineResult perl(const std::string& p, const std::string& s) { return run(p, s, 0); }
EngineResult utf(const std::string& p, const std::string& s)  { return run(p, s, PCRE2_UTF | PCRE2_UCP); }
}
REGISTER("pcre2", "PCRE2 / Perl", "Perl/PCRE", "Perl/PCRE", "10.47", "https://www.pcre.org/", perl);
REGISTER("pcre2-utf", "PCRE2 / UTF", "Perl/PCRE, UTF+UCP", "Perl/PCRE", "10.47", "https://www.pcre.org/", utf);
REGISTER("pcre2-dfa", "PCRE2 / DFA", "leftmost-longest, group-0", "linear", "10.47", "https://www.pcre.org/current/doc/html/pcre2_dfa_match.html", dfa);
