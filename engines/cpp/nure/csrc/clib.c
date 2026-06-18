// NU-RE's struct regex is private to nu-re.c and regex_clone takes it by value, so the C entry
// point must live in the same TU: include the vendored source and expose one accept/reject call.
#include <string.h>
#include "../nu-re.c"
// 1 = whole-string match, 0 = no match, -1 = parse error. nure_matches consumes the parsed regex.
int nure_run(const char *pattern, const char *input) {
  char buf[4096];
  size_t n = strlen(pattern);
  if (n >= sizeof buf) return -1;
  memcpy(buf, pattern, n + 1);
  char *p = buf;
  struct regex *re = nure_parse(&p);
  if (re == NULL) return -1;
  if (*p != '\0') { regex_free(re); return -1; }   // trailing unparsed input => invalid
  int m = nure_matches(&re, (char *)input) ? 1 : 0; // differentiates re in place
  regex_free(re);
  return m;
}
