#include <setjmp.h>
#include <stdlib.h>     /* get the real exit() declaration before we macro-redefine exit */
#include <stdio.h>      /* ditto for fprintf/vfprintf before we silence them */
extern jmp_buf memo_jmp;
#define exit(n) longjmp(memo_jmp, 1)
#define fprintf(...)  (0)
#define vfprintf(...) (0)
