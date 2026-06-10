#ifndef PLAN9_LIB9_H
#define PLAN9_LIB9_H
/* Minimal replacement for Plan9's <u.h>/<libc.h> — just what libregexp references. */
#include <stdlib.h>
#include <string.h>
#include <setjmp.h>
#include <stddef.h>
#include "utf.h"
typedef unsigned char uchar;
#ifndef nil
#define nil ((void*)0)
#endif
#define print(...) ((void)0)   /* silence Plan9 debug dumps / default error prints */
#endif
