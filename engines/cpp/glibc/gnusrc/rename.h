/* Prefix every public GNU-regex symbol with gnu_ so it cannot clash with musl libc. */
#ifndef GLIBC_RENAME_H
#define GLIBC_RENAME_H
#define re_compile_pattern  gnu_re_compile_pattern
#define re_compile_fastmap  gnu_re_compile_fastmap
#define re_search           gnu_re_search
#define re_search_2         gnu_re_search_2
#define re_match            gnu_re_match
#define re_match_2          gnu_re_match_2
#define re_set_registers    gnu_re_set_registers
#define re_set_syntax       gnu_re_set_syntax
#define re_syntax_options   gnu_re_syntax_options
#define regcomp             gnu_regcomp
#define regexec             gnu_regexec
#define regfree             gnu_regfree
#define regerror            gnu_regerror
#define re_comp             gnu_re_comp
#define re_exec             gnu_re_exec
#endif
