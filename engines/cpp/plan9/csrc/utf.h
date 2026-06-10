#ifndef PLAN9_UTF_H
#define PLAN9_UTF_H
/* Minimal Plan9 libutf surface needed by libregexp (UTF-8 codec only). */
typedef unsigned int Rune;
enum { UTFmax = 4, Runesync = 0x80, Runeself = 0x80, Runeerror = 0xFFFD, Runemax = 0x10FFFF };
int   chartorune(Rune*, char*);
int   runetochar(char*, Rune*);
int   runelen(Rune);
int   utflen(char*);
char* utfrune(char*, Rune);
#endif
