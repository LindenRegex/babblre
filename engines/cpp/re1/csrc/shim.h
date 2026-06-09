#include <setjmp.h>
#include <stdlib.h>     /* get the real exit() declaration before we macro-redefine exit */
#include <stdio.h>      /* ditto for fprintf/vfprintf before we silence them */
extern jmp_buf re1_jmp;
#define exit(n) longjmp(re1_jmp, 1)
/* re1's fatal()/yyerror() print "fatal error: syntax error" to stderr before exiting; the
   exit becomes a longjmp (recovered as an engine error), so silence the stderr noise too. */
#define fprintf(...)  (0)
#define vfprintf(...) (0)
#define parse re1_parse
#define compile re1_compile
#define reg re1_reg
#define mal re1_mal
#define fatal re1_fatal
#define gen re1_gen
#define printre re1_printre
#define printprog re1_printprog
#define backtrack re1_backtrack
#define pikevm re1_pikevm
#define thompsonvm re1_thompsonvm
#define recursiveprog re1_recursiveprog
#define recursiveloopprog re1_recursiveloopprog
#define newsub re1_newsub
#define incref re1_incref
#define copy re1_copy
#define update re1_update
#define decref re1_decref
