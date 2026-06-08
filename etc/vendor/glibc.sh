#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?usage: glibc.sh OUT}
RAW=https://raw.githubusercontent.com
REPO=coreutils/gnulib
SHA=ef75da095f3dc51700a61c4137a34a532613545d

mkdir -p "$OUT/gnusrc" "$OUT/gnusrc/malloc"

for f in regex.c regex_internal.c regex_internal.h regcomp.c regexec.c regex.h \
         libc-config.h intprops.h intprops-internal.h verify.h attribute.h gettext.h cdefs.h dynarray.h; do
  curl -fsSL "$RAW/$REPO/$SHA/lib/$f" -o "$OUT/gnusrc/$f"
done

for f in dynarray.h dynarray-skeleton.c dynarray_at_failure.c dynarray_emplace_enlarge.c \
         dynarray_finalize.c dynarray_resize.c dynarray_resize_clear.c; do
  curl -fsSL "$RAW/$REPO/$SHA/lib/malloc/$f" -o "$OUT/gnusrc/malloc/$f"
done

curl -fsSL "$RAW/$REPO/$SHA/m4/gnulib-common.m4" -o "$OUT/gnusrc/.gnulib-common.m4"
{
  echo "/* gnulib config.h common definitions (_GL_CONFIG_H_INCLUDED, _GL_ATTRIBUTE_*, _GL_GNUC_PREREQ,"
  echo "   _Noreturn, _GL_CMP, ...) that gnulib's generated config.h normally supplies. Extracted"
  echo "   verbatim from gnulib m4/gnulib-common.m4 by etc/vendor/glibc.sh -- do not edit by hand. */"
  echo "#ifndef GLIBC_REGEX_GNULIB_COMMON_H"
  echo "#define GLIBC_REGEX_GNULIB_COMMON_H"
  perl -e '
    my %want = map { $_ => 1 } qw(0witness _GL_GNUC_PREREQ _Noreturn isoc99_inline
                                  attribute c_linkage async_safe micro_optimizations restrict);
    my ($cap, $first) = (0, 0);
    while (my $line = <>) {
      if (!$cap) {
        if ($line =~ /^\s*AH_VERBATIM\(\[([A-Za-z0-9_]+)\],/ && $want{$1}) {
          print "/* --- gnulib-common.m4: $1 --- */\n"; $cap = 1; $first = 1;
        }
        next;
      }
      chomp(my $l = $line);
      if ($l =~ /^\]dnl/) { $first = 1; next; }
      $l =~ s/^\[// if $first; $first = 0;
      if ($l =~ /\]\)\s*$/) { $l =~ s/\]\)\s*$//; print "$l\n" if $l =~ /\S/; print "\n"; $cap = 0; next; }
      print "$l\n";
    }' "$OUT/gnusrc/.gnulib-common.m4"
  echo "#endif"
} > "$OUT/gnusrc/gnulib-common.h"
rm -f "$OUT/gnusrc/.gnulib-common.m4"

sed -i 's|#include <regex.h>|#include "regex.h"|' "$OUT/gnusrc/regex.c"
sed -i 's|#include <config.h>|#include "config.h"  /* PATCHED <config.h>->"config.h": find OUR gnusrc/config.h, not vendor/pcre*/config.h on the shared -I path */|' "$OUT/gnusrc/libc-config.h"
