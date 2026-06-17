#include "../registry.h"
#include <unicode/regex.h>
#include <unicode/unistr.h>
#include <unicode/utypes.h>

using namespace icu;

static EngineResult run(const std::string& pat, const std::string& subj) {
  UErrorCode status = U_ZERO_ERROR;
  RegexMatcher matcher(UnicodeString::fromUTF8(pat), 0, status);
  if (U_FAILURE(status)) return badPattern(u_errorName(status));
  UnicodeString usubj = UnicodeString::fromUTF8(subj);
  matcher.reset(usubj);
  UErrorCode fst = U_ZERO_ERROR;
  if (!matcher.find(fst)) {
    if (fst == U_REGEX_STACK_OVERFLOW || fst == U_REGEX_TIME_OUT) return limitError(u_errorName(fst));
    if (U_FAILURE(fst)) return matchError(u_errorName(fst));
    return noMatch();
  }
  int n = matcher.groupCount();                          // groupCount excludes the whole match
  return okN(n + 1, [&](int i) {
    UErrorCode st = U_ZERO_ERROR;
    int s = matcher.start(i, st), e = matcher.end(i, st);
    return (U_FAILURE(st) || s < 0) ? unmatched() : Span{ s, e, true };
  });
}

REGISTER("icu", "ICU", "RegexMatcher (full submatch)", "Perl/PCRE", "78", "https://unicode-org.github.io/icu/userguide/strings/regexp.html", run);
