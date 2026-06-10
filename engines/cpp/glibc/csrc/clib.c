/* Single TU for the GNU/gnulib regex engine; rename.h prefixes its public symbols with gnu_
   so they cannot collide with musl libc. Byte mode is the emscripten default (see gnusrc/config.h);
   the locale_charset stub is kept though modern gnulib no longer calls it. */
#include "../gnusrc/rename.h"
const char *locale_charset (void) { return "ASCII"; }
#include "../gnusrc/regex.c"
/* Modern gnulib regexec uses dynarray; its aux functions live in separate TUs upstream.
   Pull them into this TU (the gnu_-renames + <dynarray.h> macro remaps from regex.c are active). */
#include "../gnusrc/malloc/dynarray_at_failure.c"
#include "../gnusrc/malloc/dynarray_emplace_enlarge.c"
#include "../gnusrc/malloc/dynarray_finalize.c"
#include "../gnusrc/malloc/dynarray_resize.c"
#include "../gnusrc/malloc/dynarray_resize_clear.c"
