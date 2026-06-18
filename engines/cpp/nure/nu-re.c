#include "nu-re.h"
#include <limits.h>
#include <stdlib.h>
#include <string.h>

// keep in sync with PNLC example

#define METACHARS "\\-.~%*+?|&!()"

struct regex {
  enum regex_type {
    TYPE_ALT,    // r|s
    TYPE_COMPL,  // !r
    TYPE_CONCAT, // rs
    TYPE_STAR,   // r*
    TYPE_RANGE,  // a-b
    TYPE_NRANGE, // ~a-b
  } type;
  // no need to use a union because padding
  char lower, upper; // for ranges. both bounds inclusive
  struct regex *lhs, *rhs;
};

#define REGEX_EMPTY ((struct regex){TYPE_NRANGE, CHAR_MIN, CHAR_MAX})
#define REGEX_UNIV ((struct regex){TYPE_COMPL, .lhs = &REGEX_EMPTY})
#define REGEX_EPS ((struct regex){TYPE_STAR, .lhs = &REGEX_EMPTY})

#define REGEX_ISEMPTY(RE)                                                      \
  (RE->type == TYPE_NRANGE && RE->lower == CHAR_MIN && RE->upper == CHAR_MAX)
#define REGEX_ISUNIV(RE) (RE->type == TYPE_COMPL && REGEX_ISEMPTY(RE->lhs))
#define REGEX_ISEPS(RE) (RE->type == TYPE_STAR && REGEX_ISEMPTY(RE->lhs))

struct regex *regex_alloc(struct regex fields) {
  struct regex *regex = malloc(sizeof *regex);
  return *regex = fields, regex;
}

struct regex *regex_clone(struct regex regex) {
  if (regex.lhs)
    regex.lhs = regex_clone(*regex.lhs);
  if (regex.rhs)
    regex.rhs = regex_clone(*regex.rhs);
  return regex_alloc(regex);
}

void regex_free(struct regex *regex) {
  if (regex->lhs)
    regex_free(regex->lhs);
  if (regex->rhs)
    regex_free(regex->rhs);
  free(regex);
}

static void regex_simplify(struct regex **regex) {
  switch ((*regex)->type) {
  case TYPE_ALT:
    if (REGEX_ISUNIV((*regex)->lhs))
      goto hoist_lhs; // !~.|r |- !~.
    if (REGEX_ISUNIV((*regex)->rhs))
      goto hoist_rhs; // r|!~. |- !~.
    if (REGEX_ISEMPTY((*regex)->lhs))
      goto hoist_rhs; // ~.|r |- r
    if (REGEX_ISEMPTY((*regex)->rhs))
      goto hoist_lhs; // r|~. |- r
    break;
  case TYPE_COMPL:
    if ((*regex)->lhs->type == TYPE_COMPL)
      goto hoist_lhs_lhs; // !!r |- r
    break;
  case TYPE_CONCAT:
    if (REGEX_ISEMPTY((*regex)->lhs))
      goto hoist_lhs; // ~.r |- ~.
    if (REGEX_ISEMPTY((*regex)->rhs))
      goto hoist_rhs; // r~. |- ~.
    if (REGEX_ISEPS((*regex)->lhs))
      goto hoist_rhs; // ~.*r |- r
    if (REGEX_ISEPS((*regex)->rhs))
      goto hoist_lhs; // r~.* |- r
    break;
  case TYPE_STAR:
    if ((*regex)->lhs->type == TYPE_STAR)
      goto hoist_lhs; // r** |- r*
  default:
    break;
  }

  return;
hoist_lhs_lhs:;
  struct regex *lhs_lhs = (*regex)->lhs->lhs;
  (*regex)->lhs->lhs = NULL, regex_free(*regex), *regex = lhs_lhs;

  return;
hoist_lhs:;
  struct regex *lhs = (*regex)->lhs;
  (*regex)->lhs = NULL, regex_free(*regex), *regex = lhs;

  return;
hoist_rhs:;
  struct regex *rhs = (*regex)->rhs;
  (*regex)->rhs = NULL, regex_free(*regex), *regex = rhs;
}

#define regex_alloc(...) regex_alloc((struct regex){__VA_ARGS__})

// keep in sync with grammar.bnf

static char *parse_symbol(char **pattern) {
  if (!strchr(METACHARS, **pattern))
    return (*pattern)++;

  if (**pattern == '\\' && *++*pattern && strchr(METACHARS, **pattern))
    return (*pattern)++;

  return NULL;
}

static struct regex *parse_regex(char **pattern);
static struct regex *parse_atom(char **pattern) {
  if (**pattern == '%' && ++*pattern)
    return regex_clone(REGEX_UNIV);

  if (**pattern == '(' && ++*pattern) {
    struct regex *sub = parse_regex(pattern);
    if (sub == NULL)
      return NULL;

    if (**pattern == ')' && ++*pattern)
      return sub;

    return regex_free(sub), NULL;
  }

  bool compl = **pattern == '~' && ++*pattern;
  if (**pattern == '.' && ++*pattern)
    return regex_alloc(TYPE_RANGE + compl, CHAR_MIN, CHAR_MAX);

  char *lower = parse_symbol(pattern), *upper = lower;
  if (lower == NULL)
    return NULL;

  if (**pattern == '-' && ++*pattern)
    if ((upper = parse_symbol(pattern)) == NULL)
      return NULL;

  bool wraparound = *lower > *upper;
  return regex_alloc(TYPE_RANGE + (wraparound ^ compl ),
                     .lower = wraparound ? *upper + 1 : *lower,
                     .upper = wraparound ? *lower - 1 : *upper);
}

static struct regex *parse_factor(char **pattern) {
  struct regex *atom = parse_atom(pattern);
  if (atom == NULL)
    return NULL;

  if (**pattern == '*' && ++*pattern)
    atom = regex_alloc(TYPE_STAR, .lhs = atom);
  if (**pattern == '+' && ++*pattern)
    atom = regex_alloc(TYPE_CONCAT, .lhs = regex_clone(*atom),
                       .rhs = regex_alloc(TYPE_STAR, .lhs = atom));
  if (**pattern == '?' && ++*pattern)
    atom = regex_alloc(TYPE_ALT, .lhs = regex_clone(REGEX_EPS), .rhs = atom);

  regex_simplify(&atom);
  return atom;
}

static struct regex *parse_term(char **pattern) {
  // hacky lookahead for better diagnostics
  if (strchr(")|&", **pattern))
    return regex_clone(REGEX_EPS);

  struct regex *factor = parse_factor(pattern);
  if (factor == NULL)
    return NULL;

  struct regex *cat = parse_term(pattern);
  if (cat == NULL)
    return regex_free(factor), NULL;

  struct regex *term = regex_alloc(TYPE_CONCAT, .lhs = factor, .rhs = cat);
  regex_simplify(&term);
  return term;
}

static struct regex *parse_regex(char **pattern) {
  bool compl = **pattern == '!' && ++*pattern;

  struct regex *term = parse_term(pattern);
  if (term == NULL)
    return NULL;

  term = compl ? regex_alloc(TYPE_COMPL, .lhs = term) : term;

  if (**pattern == '|' || **pattern == '&') {
    bool intersect = *(*pattern)++ == '&';
    struct regex *alt = parse_regex(pattern);
    if (alt == NULL)
      return regex_free(term), NULL;

    if (!intersect)
      return regex_alloc(TYPE_ALT, .lhs = term, .rhs = alt);

    term = regex_alloc(TYPE_COMPL, .lhs = term);
    alt = regex_alloc(TYPE_COMPL, .lhs = alt);
    regex_simplify(&term), regex_simplify(&alt);
    return regex_alloc(TYPE_COMPL,
                       .lhs = regex_alloc(TYPE_ALT, .lhs = term, .rhs = alt));
  }

  return term;
}

struct regex *nure_parse(char **pattern) {
  struct regex *regex = parse_regex(pattern);
  if (regex == NULL)
    return NULL;

  if (**pattern != '\0')
    return regex_free(regex), NULL;

  return regex;
}

bool nure_nullable(struct regex *regex) {
  // a regular expression is nullable if and only if it accepts the empty word

  switch (regex->type) {
  case TYPE_ALT:
    return nure_nullable(regex->lhs) || nure_nullable(regex->rhs);
  case TYPE_COMPL:
    return !nure_nullable(regex->lhs);
  case TYPE_CONCAT:
    return nure_nullable(regex->lhs) && nure_nullable(regex->rhs);
  case TYPE_STAR:
    return true;
  case TYPE_RANGE:
  case TYPE_NRANGE:
    return false;
  }

  abort(); // should have diverged
}

void nure_differentiate(struct regex **regex, char chr) {
  // a derivative of a regular expression with respect to a symbol is any
  // regular expression that accepts exactly the strings that, if prepended by
  // the symbol, would have been accepted by the original regular expression

  switch ((*regex)->type) {
  case TYPE_ALT:
    nure_differentiate(&(*regex)->rhs, chr);
  case TYPE_COMPL:
    nure_differentiate(&(*regex)->lhs, chr);
    regex_simplify(regex);
    break;
  case TYPE_CONCAT:;
    bool nullable = nure_nullable((*regex)->lhs);
    nure_differentiate(&(*regex)->lhs, chr);
    if (nullable) {
      *regex = regex_alloc(TYPE_ALT, .lhs = *regex,
                           .rhs = regex_clone(*(*regex)->rhs));
      nure_differentiate(&(*regex)->rhs, chr);
      regex_simplify(&(*regex)->lhs);
    }
    regex_simplify(regex);
    break;
  case TYPE_STAR:
    *regex = regex_alloc(TYPE_CONCAT, .lhs = regex_clone(*(*regex)->lhs),
                         .rhs = *regex);
    nure_differentiate(&(*regex)->lhs, chr);
    regex_simplify(regex);
    break;
  case TYPE_RANGE:
  case TYPE_NRANGE:;
    bool compl = (*regex)->type == TYPE_NRANGE;
    if (((*regex)->lower <= chr && chr <= (*regex)->upper) ^ compl )
      **regex = (struct regex){TYPE_STAR, .lhs = regex_clone(REGEX_EMPTY)};
    else
      **regex = REGEX_EMPTY;
  }
}

bool nure_matches(struct regex **regex, char *input) {
  // a regular expression accepts a word if and only if its derivative with
  // respect to that word (defined inductively in the obvious way) is nullable

  for (; *input; input++)
    nure_differentiate(regex, *input);
  return nure_nullable(*regex);
}
