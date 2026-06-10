/* Minimal UTF-8 codec (the subset of Plan9 libutf that libregexp uses). */
#include "utf.h"

enum {
  Tx = 0x80, T2 = 0xC0, T3 = 0xE0, T4 = 0xF0, T5 = 0xF8,
  Maskx = 0x3F,
  Rune1 = 0x7F, Rune2 = 0x7FF, Rune3 = 0xFFFF
};

int chartorune(Rune* rune, char* str) {
  unsigned char* s = (unsigned char*)str;
  unsigned c = s[0];
  if (c < Tx) { *rune = c; return 1; }
  if ((c & T3) == T2) {                                   /* 2 bytes */
    if ((s[1] & T2) != Tx) goto bad;
    Rune r = ((c & 0x1F) << 6) | (s[1] & Maskx);
    if (r <= Rune1) goto bad;
    *rune = r; return 2;
  }
  if ((c & T4) == T3) {                                   /* 3 bytes */
    if ((s[1] & T2) != Tx || (s[2] & T2) != Tx) goto bad;
    Rune r = ((c & 0x0F) << 12) | ((s[1] & Maskx) << 6) | (s[2] & Maskx);
    if (r <= Rune2) goto bad;
    *rune = r; return 3;
  }
  if ((c & T5) == T4) {                                   /* 4 bytes */
    if ((s[1] & T2) != Tx || (s[2] & T2) != Tx || (s[3] & T2) != Tx) goto bad;
    Rune r = ((c & 0x07) << 18) | ((s[1] & Maskx) << 12) | ((s[2] & Maskx) << 6) | (s[3] & Maskx);
    if (r <= Rune3 || r > Runemax) goto bad;
    *rune = r; return 4;
  }
bad:
  *rune = Runeerror; return 1;
}

int runetochar(char* str, Rune* rune) {
  Rune c = *rune;
  unsigned char* s = (unsigned char*)str;
  if (c <= Rune1) { s[0] = c; return 1; }
  if (c <= Rune2) { s[0] = T2 | (c >> 6); s[1] = Tx | (c & Maskx); return 2; }
  if (c > Runemax) c = Runeerror;
  if (c <= Rune3) { s[0] = T3 | (c >> 12); s[1] = Tx | ((c >> 6) & Maskx); s[2] = Tx | (c & Maskx); return 3; }
  s[0] = T4 | (c >> 18); s[1] = Tx | ((c >> 12) & Maskx); s[2] = Tx | ((c >> 6) & Maskx); s[3] = Tx | (c & Maskx);
  return 4;
}

int runelen(Rune c) { char b[UTFmax]; return runetochar(b, &c); }

int utflen(char* s) {
  int n = 0; Rune r;
  while (*s) { s += chartorune(&r, s); n++; }
  return n;
}

char* utfrune(char* s, Rune c) {
  Rune r;
  if (c < Runesync) { for (; *s; s++) if ((unsigned char)*s == c) return s; return 0; }
  while (*s) { int n = chartorune(&r, s); if (r == c) return s; s += n; }
  return 0;
}
