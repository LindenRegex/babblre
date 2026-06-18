// Thin C entry point over Davis's memoized backtracker (the rest of src/ is the upstream
// engine verbatim, bar two silenced debug prints). Keeps all the C headers/types on the C
// side of the ABI so the C++ wrapper only needs one extern "C" declaration.
#include "regexp.h"
#include "memoize.h"

jmp_buf memo_jmp;

static void freeprog(Prog *p) {
  int i;
  for (i = 0; i < p->len; i++)
    if ((p->start + i)->edges != NULL) free((p->start + i)->edges);
  free(p);   // also frees p->start
}

// Full memoization => the backtracker runs in linear time (no catastrophic blowup).
// spans[2i]/spans[2i+1] = start/end byte offsets of group i (-1 if the group didn't match).
// Returns group count, 0 for no match, -1 for a compile/parse error.
int memo_match(const char *pattern, const char *input, int *spans, int maxGroups) {
  if (setjmp(memo_jmp)) return -1;
  Regexp *re = parse((char *)pattern);
  if (re == NULL) return -1;
  re = transform(re);
  Prog *prog = compile(re, MEMO_FULL);
  if (prog == NULL) { freereg(re); return -1; }
  prog->memoMode = MEMO_FULL;
  prog->memoEncoding = ENCODING_NEGATIVE;
  Prog_determineMemoNodes(prog, MEMO_FULL);

  char *sub[MAXSUB];
  memset(sub, 0, sizeof sub);
  int matched = backtrack(prog, (char *)input, sub, MAXSUB);

  int ngroups = 0;
  if (matched) {
    ngroups = 1;                                  // group g uses Save slots 2g and 2g+1
    for (int i = 0; i < prog->len; i++)
      if ((prog->start + i)->opcode == Save && (prog->start + i)->n / 2 + 1 > ngroups)
        ngroups = (prog->start + i)->n / 2 + 1;
    if (ngroups > maxGroups) ngroups = maxGroups;
    for (int i = 0; i < ngroups; i++) {
      spans[2 * i]     = sub[2 * i]     ? (int)(sub[2 * i]     - input) : -1;
      spans[2 * i + 1] = sub[2 * i + 1] ? (int)(sub[2 * i + 1] - input) : -1;
    }
  }
  freeprog(prog);
  freereg(re);
  return matched ? ngroups : 0;
}
