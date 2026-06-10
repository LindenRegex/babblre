/* Minimal HAVE_CONFIG_H config for standalone gnulib regex (the non-_LIBC path).
   Modern gnulib dropped RE_ENABLE_I18N: the multibyte machinery is always compiled and
   byte-vs-UTF-8 is chosen at runtime from MB_CUR_MAX / nl_langinfo(CODESET). Under emscripten
   the default "C" locale gives MB_CUR_MAX==1 and CODESET=="ASCII" (nothing calls
   setlocale(LC_ALL,"")), so the multibyte paths stay dormant -> byte matching, as before. */
#ifndef GLIBC_REGEX_CONFIG_H
#define GLIBC_REGEX_CONFIG_H
#include <stdint.h>
/* _GL_CONFIG_H_INCLUDED, _GL_ATTRIBUTE_*, _GL_GNUC_PREREQ, _Noreturn, _GL_CMP, ... that gnulib's
   generated config.h would provide (attribute.h #errors without _GL_CONFIG_H_INCLUDED). */
#include "gnulib-common.h"
/* Use the platform's standard <wchar.h>/<wctype.h> (mbrtowc, wctype, iswctype, ...) which musl
   provides, instead of gnulib's extended <uchar.h> c32* module (which we do not vendor). */
#define _REGEX_AVOID_UCHAR_H 1
#define HAVE_ISBLANK 1        /* musl provides isblank(); skip regex's fallback macro. */
#define HAVE_DECL_ISBLANK 1
#define HAVE_MALLOC_0_NONNULL 1 /* musl malloc(0) returns a unique non-NULL pointer. */
#endif
