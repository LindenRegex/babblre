/* A Bison parser, made by GNU Bison 3.8.2.  */

/* Bison implementation for Yacc-like parsers in C

   Copyright (C) 1984, 1989-1990, 2000-2015, 2018-2021 Free Software Foundation,
   Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* C LALR(1) parser skeleton written by Richard Stallman, by
   simplifying the original so-called "semantic" parser.  */

/* DO NOT RELY ON FEATURES THAT ARE NOT DOCUMENTED in the manual,
   especially those whose name start with YY_ or yy_.  They are
   private implementation details that can be changed or removed.  */

/* All symbols defined below should begin with yy or YY, to avoid
   infringing on user name space.  This should be done even for local
   variables, as they might otherwise be expanded by user macros.
   There are some unavoidable exceptions within include files to
   define necessary library symbols; they are noted "INFRINGES ON
   USER NAME SPACE" below.  */

/* Identify Bison output, and Bison version.  */
#define YYBISON 30802

/* Bison version string.  */
#define YYBISON_VERSION "3.8.2"

/* Skeleton name.  */
#define YYSKELETON_NAME "yacc.c"

/* Pure parsers.  */
#define YYPURE 0

/* Push parsers.  */
#define YYPUSH 0

/* Pull parsers.  */
#define YYPULL 1




/* First part of user prologue.  */
#line 5 "parse.y"

#include <stdlib.h>
#include <ctype.h>
#include "regexp.h"
#include "log.h"

static int yylex(void);
static void yyerror(char*);
static Regexp *parsed_regexp;
static int nparen;

static char _curlyString[64];
static int _curlyStringIx = 0;
typedef struct _curlyNumbers {
	int min;
	int max;
} curlyNumbers;

static void _handleCurlyChar(int chr) {
	if (isdigit(chr) || chr == ',') {
		_curlyString[_curlyStringIx++] = chr;
	}
	else {
		printf("curlyString invalid char: %c\n", chr);
		yyerror("curlyString: invalid char");
	}
}

// Parse {1}, {1,2}, {,1}, and {1,} into a curlyNumbers
static curlyNumbers parseCurlies(char *str) {
	curlyNumbers cn;
	int low;
	int high;
	char *comma;

	comma = strchr(str, ',');
	if (comma == NULL) { // {1}
		low = high = atoi(str);
	} else if (comma == str) { // {,1}
		low = -1;
		high = atoi(str+1);
	} else if (comma == str + strlen(str) - 1) { // {1,}
		low = atoi(str);
		high = -1;
	} else {
		low = atoi(str);
		high = atoi(comma+1);
	}

	cn.min = low;
	cn.max = high;
	if (cn.min >= 0 && cn.max >= 0 && cn.min > cn.max)
		yyerror("A{M,N}: M must be <= N");

	return cn;
}

static int DISABLE_CAPTURES = 0; // We ignore captures during parsing of (?=lookahead)


#line 132 "y.tab.c"

# ifndef YY_CAST
#  ifdef __cplusplus
#   define YY_CAST(Type, Val) static_cast<Type> (Val)
#   define YY_REINTERPRET_CAST(Type, Val) reinterpret_cast<Type> (Val)
#  else
#   define YY_CAST(Type, Val) ((Type) (Val))
#   define YY_REINTERPRET_CAST(Type, Val) ((Type) (Val))
#  endif
# endif
# ifndef YY_NULLPTR
#  if defined __cplusplus
#   if 201103L <= __cplusplus
#    define YY_NULLPTR nullptr
#   else
#    define YY_NULLPTR 0
#   endif
#  else
#   define YY_NULLPTR ((void*)0)
#  endif
# endif


/* Debug traces.  */
#ifndef YYDEBUG
# define YYDEBUG 0
#endif
#if YYDEBUG
extern int yydebug;
#endif

/* Token kinds.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
  enum yytokentype
  {
    YYEMPTY = -2,
    YYEOF = 0,                     /* "end of file"  */
    YYerror = 256,                 /* error  */
    YYUNDEF = 257,                 /* "invalid token"  */
    CHAR = 258,                    /* CHAR  */
    EOL = 259                      /* EOL  */
  };
  typedef enum yytokentype yytoken_kind_t;
#endif
/* Token kinds.  */
#define YYEMPTY -2
#define YYEOF 0
#define YYerror 256
#define YYUNDEF 257
#define CHAR 258
#define EOL 259

/* Value type.  */
#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
union YYSTYPE
{
#line 66 "parse.y"

	Regexp *re;
	int c;
	int nparen;
	char *curlyString;

#line 197 "y.tab.c"

};
typedef union YYSTYPE YYSTYPE;
# define YYSTYPE_IS_TRIVIAL 1
# define YYSTYPE_IS_DECLARED 1
#endif


extern YYSTYPE yylval;


int yyparse (void);



/* Symbol kind.  */
enum yysymbol_kind_t
{
  YYSYMBOL_YYEMPTY = -2,
  YYSYMBOL_YYEOF = 0,                      /* "end of file"  */
  YYSYMBOL_YYerror = 1,                    /* error  */
  YYSYMBOL_YYUNDEF = 2,                    /* "invalid token"  */
  YYSYMBOL_CHAR = 3,                       /* CHAR  */
  YYSYMBOL_EOL = 4,                        /* EOL  */
  YYSYMBOL_5_ = 5,                         /* '|'  */
  YYSYMBOL_6_ = 6,                         /* '*'  */
  YYSYMBOL_7_ = 7,                         /* '?'  */
  YYSYMBOL_8_ = 8,                         /* '+'  */
  YYSYMBOL_9_ = 9,                         /* '{'  */
  YYSYMBOL_10_ = 10,                       /* '}'  */
  YYSYMBOL_11_ = 11,                       /* '\\'  */
  YYSYMBOL_12_ = 12,                       /* '('  */
  YYSYMBOL_13_ = 13,                       /* ')'  */
  YYSYMBOL_14_ = 14,                       /* ':'  */
  YYSYMBOL_15_ = 15,                       /* '='  */
  YYSYMBOL_16_ = 16,                       /* '.'  */
  YYSYMBOL_17_ = 17,                       /* '['  */
  YYSYMBOL_18_ = 18,                       /* ']'  */
  YYSYMBOL_19_ = 19,                       /* '-'  */
  YYSYMBOL_20_ = 20,                       /* '^'  */
  YYSYMBOL_21_ = 21,                       /* '$'  */
  YYSYMBOL_YYACCEPT = 22,                  /* $accept  */
  YYSYMBOL_line = 23,                      /* line  */
  YYSYMBOL_alt = 24,                       /* alt  */
  YYSYMBOL_concat = 25,                    /* concat  */
  YYSYMBOL_repeat = 26,                    /* repeat  */
  YYSYMBOL_curly = 27,                     /* curly  */
  YYSYMBOL_28_1 = 28,                      /* $@1  */
  YYSYMBOL_curlyString = 29,               /* curlyString  */
  YYSYMBOL_count = 30,                     /* count  */
  YYSYMBOL_escape = 31,                    /* escape  */
  YYSYMBOL_single = 32,                    /* single  */
  YYSYMBOL_33_2 = 33,                      /* $@2  */
  YYSYMBOL_ccc = 34,                       /* ccc  */
  YYSYMBOL_charRanges = 35,                /* charRanges  */
  YYSYMBOL_charRange = 36,                 /* charRange  */
  YYSYMBOL_charRangeChar = 37              /* charRangeChar  */
};
typedef enum yysymbol_kind_t yysymbol_kind_t;




#ifdef short
# undef short
#endif

/* On compilers that do not define __PTRDIFF_MAX__ etc., make sure
   <limits.h> and (if available) <stdint.h> are included
   so that the code can choose integer types of a good width.  */

#ifndef __PTRDIFF_MAX__
# include <limits.h> /* INFRINGES ON USER NAME SPACE */
# if defined __STDC_VERSION__ && 199901 <= __STDC_VERSION__
#  include <stdint.h> /* INFRINGES ON USER NAME SPACE */
#  define YY_STDINT_H
# endif
#endif

/* Narrow types that promote to a signed type and that can represent a
   signed or unsigned integer of at least N bits.  In tables they can
   save space and decrease cache pressure.  Promoting to a signed type
   helps avoid bugs in integer arithmetic.  */

#ifdef __INT_LEAST8_MAX__
typedef __INT_LEAST8_TYPE__ yytype_int8;
#elif defined YY_STDINT_H
typedef int_least8_t yytype_int8;
#else
typedef signed char yytype_int8;
#endif

#ifdef __INT_LEAST16_MAX__
typedef __INT_LEAST16_TYPE__ yytype_int16;
#elif defined YY_STDINT_H
typedef int_least16_t yytype_int16;
#else
typedef short yytype_int16;
#endif

/* Work around bug in HP-UX 11.23, which defines these macros
   incorrectly for preprocessor constants.  This workaround can likely
   be removed in 2023, as HPE has promised support for HP-UX 11.23
   (aka HP-UX 11i v2) only through the end of 2022; see Table 2 of
   <https://h20195.www2.hpe.com/V2/getpdf.aspx/4AA4-7673ENW.pdf>.  */
#ifdef __hpux
# undef UINT_LEAST8_MAX
# undef UINT_LEAST16_MAX
# define UINT_LEAST8_MAX 255
# define UINT_LEAST16_MAX 65535
#endif

#if defined __UINT_LEAST8_MAX__ && __UINT_LEAST8_MAX__ <= __INT_MAX__
typedef __UINT_LEAST8_TYPE__ yytype_uint8;
#elif (!defined __UINT_LEAST8_MAX__ && defined YY_STDINT_H \
       && UINT_LEAST8_MAX <= INT_MAX)
typedef uint_least8_t yytype_uint8;
#elif !defined __UINT_LEAST8_MAX__ && UCHAR_MAX <= INT_MAX
typedef unsigned char yytype_uint8;
#else
typedef short yytype_uint8;
#endif

#if defined __UINT_LEAST16_MAX__ && __UINT_LEAST16_MAX__ <= __INT_MAX__
typedef __UINT_LEAST16_TYPE__ yytype_uint16;
#elif (!defined __UINT_LEAST16_MAX__ && defined YY_STDINT_H \
       && UINT_LEAST16_MAX <= INT_MAX)
typedef uint_least16_t yytype_uint16;
#elif !defined __UINT_LEAST16_MAX__ && USHRT_MAX <= INT_MAX
typedef unsigned short yytype_uint16;
#else
typedef int yytype_uint16;
#endif

#ifndef YYPTRDIFF_T
# if defined __PTRDIFF_TYPE__ && defined __PTRDIFF_MAX__
#  define YYPTRDIFF_T __PTRDIFF_TYPE__
#  define YYPTRDIFF_MAXIMUM __PTRDIFF_MAX__
# elif defined PTRDIFF_MAX
#  ifndef ptrdiff_t
#   include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  endif
#  define YYPTRDIFF_T ptrdiff_t
#  define YYPTRDIFF_MAXIMUM PTRDIFF_MAX
# else
#  define YYPTRDIFF_T long
#  define YYPTRDIFF_MAXIMUM LONG_MAX
# endif
#endif

#ifndef YYSIZE_T
# ifdef __SIZE_TYPE__
#  define YYSIZE_T __SIZE_TYPE__
# elif defined size_t
#  define YYSIZE_T size_t
# elif defined __STDC_VERSION__ && 199901 <= __STDC_VERSION__
#  include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  define YYSIZE_T size_t
# else
#  define YYSIZE_T unsigned
# endif
#endif

#define YYSIZE_MAXIMUM                                  \
  YY_CAST (YYPTRDIFF_T,                                 \
           (YYPTRDIFF_MAXIMUM < YY_CAST (YYSIZE_T, -1)  \
            ? YYPTRDIFF_MAXIMUM                         \
            : YY_CAST (YYSIZE_T, -1)))

#define YYSIZEOF(X) YY_CAST (YYPTRDIFF_T, sizeof (X))


/* Stored state numbers (used for stacks). */
typedef yytype_int8 yy_state_t;

/* State numbers in computations.  */
typedef int yy_state_fast_t;

#ifndef YY_
# if defined YYENABLE_NLS && YYENABLE_NLS
#  if ENABLE_NLS
#   include <libintl.h> /* INFRINGES ON USER NAME SPACE */
#   define YY_(Msgid) dgettext ("bison-runtime", Msgid)
#  endif
# endif
# ifndef YY_
#  define YY_(Msgid) Msgid
# endif
#endif


#ifndef YY_ATTRIBUTE_PURE
# if defined __GNUC__ && 2 < __GNUC__ + (96 <= __GNUC_MINOR__)
#  define YY_ATTRIBUTE_PURE __attribute__ ((__pure__))
# else
#  define YY_ATTRIBUTE_PURE
# endif
#endif

#ifndef YY_ATTRIBUTE_UNUSED
# if defined __GNUC__ && 2 < __GNUC__ + (7 <= __GNUC_MINOR__)
#  define YY_ATTRIBUTE_UNUSED __attribute__ ((__unused__))
# else
#  define YY_ATTRIBUTE_UNUSED
# endif
#endif

/* Suppress unused-variable warnings by "using" E.  */
#if ! defined lint || defined __GNUC__
# define YY_USE(E) ((void) (E))
#else
# define YY_USE(E) /* empty */
#endif

/* Suppress an incorrect diagnostic about yylval being uninitialized.  */
#if defined __GNUC__ && ! defined __ICC && 406 <= __GNUC__ * 100 + __GNUC_MINOR__
# if __GNUC__ * 100 + __GNUC_MINOR__ < 407
#  define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN                           \
    _Pragma ("GCC diagnostic push")                                     \
    _Pragma ("GCC diagnostic ignored \"-Wuninitialized\"")
# else
#  define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN                           \
    _Pragma ("GCC diagnostic push")                                     \
    _Pragma ("GCC diagnostic ignored \"-Wuninitialized\"")              \
    _Pragma ("GCC diagnostic ignored \"-Wmaybe-uninitialized\"")
# endif
# define YY_IGNORE_MAYBE_UNINITIALIZED_END      \
    _Pragma ("GCC diagnostic pop")
#else
# define YY_INITIAL_VALUE(Value) Value
#endif
#ifndef YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_END
#endif
#ifndef YY_INITIAL_VALUE
# define YY_INITIAL_VALUE(Value) /* Nothing. */
#endif

#if defined __cplusplus && defined __GNUC__ && ! defined __ICC && 6 <= __GNUC__
# define YY_IGNORE_USELESS_CAST_BEGIN                          \
    _Pragma ("GCC diagnostic push")                            \
    _Pragma ("GCC diagnostic ignored \"-Wuseless-cast\"")
# define YY_IGNORE_USELESS_CAST_END            \
    _Pragma ("GCC diagnostic pop")
#endif
#ifndef YY_IGNORE_USELESS_CAST_BEGIN
# define YY_IGNORE_USELESS_CAST_BEGIN
# define YY_IGNORE_USELESS_CAST_END
#endif


#define YY_ASSERT(E) ((void) (0 && (E)))

#if !defined yyoverflow

/* The parser invokes alloca or malloc; define the necessary symbols.  */

# ifdef YYSTACK_USE_ALLOCA
#  if YYSTACK_USE_ALLOCA
#   ifdef __GNUC__
#    define YYSTACK_ALLOC __builtin_alloca
#   elif defined __BUILTIN_VA_ARG_INCR
#    include <alloca.h> /* INFRINGES ON USER NAME SPACE */
#   elif defined _AIX
#    define YYSTACK_ALLOC __alloca
#   elif defined _MSC_VER
#    include <malloc.h> /* INFRINGES ON USER NAME SPACE */
#    define alloca _alloca
#   else
#    define YYSTACK_ALLOC alloca
#    if ! defined _ALLOCA_H && ! defined EXIT_SUCCESS
#     include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
      /* Use EXIT_SUCCESS as a witness for stdlib.h.  */
#     ifndef EXIT_SUCCESS
#      define EXIT_SUCCESS 0
#     endif
#    endif
#   endif
#  endif
# endif

# ifdef YYSTACK_ALLOC
   /* Pacify GCC's 'empty if-body' warning.  */
#  define YYSTACK_FREE(Ptr) do { /* empty */; } while (0)
#  ifndef YYSTACK_ALLOC_MAXIMUM
    /* The OS might guarantee only one guard page at the bottom of the stack,
       and a page size can be as small as 4096 bytes.  So we cannot safely
       invoke alloca (N) if N exceeds 4096.  Use a slightly smaller number
       to allow for a few compiler-allocated temporary stack slots.  */
#   define YYSTACK_ALLOC_MAXIMUM 4032 /* reasonable circa 2006 */
#  endif
# else
#  define YYSTACK_ALLOC YYMALLOC
#  define YYSTACK_FREE YYFREE
#  ifndef YYSTACK_ALLOC_MAXIMUM
#   define YYSTACK_ALLOC_MAXIMUM YYSIZE_MAXIMUM
#  endif
#  if (defined __cplusplus && ! defined EXIT_SUCCESS \
       && ! ((defined YYMALLOC || defined malloc) \
             && (defined YYFREE || defined free)))
#   include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#   ifndef EXIT_SUCCESS
#    define EXIT_SUCCESS 0
#   endif
#  endif
#  ifndef YYMALLOC
#   define YYMALLOC malloc
#   if ! defined malloc && ! defined EXIT_SUCCESS
void *malloc (YYSIZE_T); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
#  ifndef YYFREE
#   define YYFREE free
#   if ! defined free && ! defined EXIT_SUCCESS
void free (void *); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
# endif
#endif /* !defined yyoverflow */

#if (! defined yyoverflow \
     && (! defined __cplusplus \
         || (defined YYSTYPE_IS_TRIVIAL && YYSTYPE_IS_TRIVIAL)))

/* A type that is properly aligned for any stack member.  */
union yyalloc
{
  yy_state_t yyss_alloc;
  YYSTYPE yyvs_alloc;
};

/* The size of the maximum gap between one aligned stack and the next.  */
# define YYSTACK_GAP_MAXIMUM (YYSIZEOF (union yyalloc) - 1)

/* The size of an array large to enough to hold all stacks, each with
   N elements.  */
# define YYSTACK_BYTES(N) \
     ((N) * (YYSIZEOF (yy_state_t) + YYSIZEOF (YYSTYPE)) \
      + YYSTACK_GAP_MAXIMUM)

# define YYCOPY_NEEDED 1

/* Relocate STACK from its old location to the new one.  The
   local variables YYSIZE and YYSTACKSIZE give the old and new number of
   elements in the stack, and YYPTR gives the new location of the
   stack.  Advance YYPTR to a properly aligned location for the next
   stack.  */
# define YYSTACK_RELOCATE(Stack_alloc, Stack)                           \
    do                                                                  \
      {                                                                 \
        YYPTRDIFF_T yynewbytes;                                         \
        YYCOPY (&yyptr->Stack_alloc, Stack, yysize);                    \
        Stack = &yyptr->Stack_alloc;                                    \
        yynewbytes = yystacksize * YYSIZEOF (*Stack) + YYSTACK_GAP_MAXIMUM; \
        yyptr += yynewbytes / YYSIZEOF (*yyptr);                        \
      }                                                                 \
    while (0)

#endif

#if defined YYCOPY_NEEDED && YYCOPY_NEEDED
/* Copy COUNT objects from SRC to DST.  The source and destination do
   not overlap.  */
# ifndef YYCOPY
#  if defined __GNUC__ && 1 < __GNUC__
#   define YYCOPY(Dst, Src, Count) \
      __builtin_memcpy (Dst, Src, YY_CAST (YYSIZE_T, (Count)) * sizeof (*(Src)))
#  else
#   define YYCOPY(Dst, Src, Count)              \
      do                                        \
        {                                       \
          YYPTRDIFF_T yyi;                      \
          for (yyi = 0; yyi < (Count); yyi++)   \
            (Dst)[yyi] = (Src)[yyi];            \
        }                                       \
      while (0)
#  endif
# endif
#endif /* !YYCOPY_NEEDED */

/* YYFINAL -- State number of the termination state.  */
#define YYFINAL  56
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   230

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  22
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  16
/* YYNRULES -- Number of rules.  */
#define YYNRULES  74
/* YYNSTATES -- Number of states.  */
#define YYNSTATES  97

/* YYMAXUTOK -- Last valid token kind.  */
#define YYMAXUTOK   259


/* YYTRANSLATE(TOKEN-NUM) -- Symbol number corresponding to TOKEN-NUM
   as returned by yylex, with out-of-bounds checking.  */
#define YYTRANSLATE(YYX)                                \
  (0 <= (YYX) && (YYX) <= YYMAXUTOK                     \
   ? YY_CAST (yysymbol_kind_t, yytranslate[YYX])        \
   : YYSYMBOL_YYUNDEF)

/* YYTRANSLATE[TOKEN-NUM] -- Symbol number corresponding to TOKEN-NUM
   as returned by yylex.  */
static const yytype_int8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,    21,     2,     2,     2,
      12,    13,     6,     8,     2,    19,    16,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    14,     2,
       2,    15,     2,     7,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    17,    11,    18,    20,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     9,     5,    10,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     1,     2,     3,     4
};

#if YYDEBUG
/* YYRLINE[YYN] -- Source line where rule number YYN was defined.  */
static const yytype_int16 yyrline[] =
{
       0,    81,    81,    89,    90,    97,    98,   105,   106,   110,
     115,   119,   124,   128,   133,   138,   148,   147,   162,   167,
     175,   182,   192,   197,   202,   207,   212,   217,   222,   227,
     232,   237,   242,   247,   252,   257,   262,   267,   272,   280,
     290,   295,   294,   305,   309,   314,   319,   323,   328,   332,
     337,   342,   350,   355,   363,   370,   376,   381,   391,   392,
     401,   408,   422,   427,   428,   433,   438,   443,   448,   453,
     458,   463,   468,   473,   478
};
#endif

/** Accessing symbol of state STATE.  */
#define YY_ACCESSING_SYMBOL(State) YY_CAST (yysymbol_kind_t, yystos[State])

#if YYDEBUG || 0
/* The user-facing name of the symbol whose (internal) number is
   YYSYMBOL.  No bounds checking.  */
static const char *yysymbol_name (yysymbol_kind_t yysymbol) YY_ATTRIBUTE_UNUSED;

/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "\"end of file\"", "error", "\"invalid token\"", "CHAR", "EOL", "'|'",
  "'*'", "'?'", "'+'", "'{'", "'}'", "'\\\\'", "'('", "')'", "':'", "'='",
  "'.'", "'['", "']'", "'-'", "'^'", "'$'", "$accept", "line", "alt",
  "concat", "repeat", "curly", "$@1", "curlyString", "count", "escape",
  "single", "$@2", "ccc", "charRanges", "charRange", "charRangeChar", YY_NULLPTR
};

static const char *
yysymbol_name (yysymbol_kind_t yysymbol)
{
  return yytname[yysymbol];
}
#endif

#define YYPACT_NINF (-51)

#define yypact_value_is_default(Yyn) \
  ((Yyn) == YYPACT_NINF)

#define YYTABLE_NINF (-1)

#define yytable_value_is_error(Yyn) \
  0

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
static const yytype_int16 yypact[] =
{
      29,   -51,    78,    11,   -51,   -51,   -51,    97,   -51,   -51,
     -51,     9,    18,    29,   -51,   -51,    19,   -51,   -51,   -51,
     -51,   -51,   -51,   -51,   -51,   -51,   -51,   -51,   -51,   -51,
     -51,   -51,   -51,   -51,   -51,   -51,    -3,    29,   -51,   -51,
     -51,   -51,   -51,   -51,   -51,   -51,   -51,   -51,   -51,   -51,
     130,   115,   -51,   144,   -51,    10,   -51,   -51,    29,   -51,
      13,    24,    26,   -51,    27,    29,   -51,     1,   -51,   158,
     172,   186,   -51,   -51,   214,    29,   -51,   -51,   -51,    32,
     -51,     2,    29,   -51,   -51,   -51,   200,   -51,   -51,   -51,
       7,   -51,     3,   -51,   -51,   -51,   -51
};

/* YYDEFACT[STATE-NUM] -- Default reduction number in state STATE-NUM.
   Performed when YYTABLE does not specify something else to do.  Zero
   means the default is an error.  */
static const yytype_int8 yydefact[] =
{
       0,    47,     0,    20,    44,    45,    48,     0,    49,    50,
      51,     0,     0,     3,     5,    43,     7,    46,    21,    22,
      23,    25,    24,    28,    29,    36,    26,    27,    30,    31,
      32,    33,    34,    35,    37,    38,     0,     0,    62,    74,
      67,    69,    68,    72,    73,    70,    71,    65,    66,    64,
       0,     0,    63,     0,    58,    61,     1,     2,     0,     6,
       8,    12,    10,    16,    14,     0,    41,     0,    52,     0,
       0,     0,    53,    59,     0,     4,     9,    13,    11,     0,
      15,     0,     0,    39,    54,    55,     0,    56,    60,    18,
       0,    40,     0,    57,    19,    17,    42
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int8 yypgoto[] =
{
     -51,   -51,   -35,   -20,   -12,   -51,   -51,   -51,   -51,     0,
     -51,   -51,   -51,   -46,   -50,   -32
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int8 yydefgoto[] =
{
       0,    11,    12,    13,    14,    64,    79,    90,    37,    52,
      16,    82,    17,    53,    54,    55
};

/* YYTABLE[YYPACT[STATE-NUM]] -- What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule whose
   number is the opposite.  If YYTABLE_NINF, syntax error.  */
static const yytype_int8 yytable[] =
{
      15,    59,    67,    73,    69,    71,    58,    58,    58,    56,
      94,    65,    66,    15,    83,    91,    96,    95,    36,    73,
      76,    73,    57,    58,    86,    60,    61,    62,    63,    74,
      81,    77,     1,    78,    80,    89,    73,    15,    75,     0,
       2,     3,    88,     4,     5,     6,     7,    92,     8,     9,
      10,     0,     0,     0,     0,     0,     0,     0,    15,     0,
       0,     0,     0,    59,     0,    15,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    15,     0,     0,     0,     0,
       0,    18,    15,    19,    20,    21,    22,    23,    24,    25,
      26,    27,    28,    29,    30,    31,    32,    33,    34,    35,
      38,     0,    39,    40,    41,    42,    43,    44,     2,    45,
      46,    47,    48,    49,     0,     0,    50,    51,    38,     0,
      39,    40,    41,    42,    43,    44,     2,    45,    46,    47,
      48,    49,     0,    38,    70,    39,    40,    41,    42,    43,
      44,     2,    45,    46,    47,    48,    49,    38,    68,    39,
      40,    41,    42,    43,    44,     2,    45,    46,    47,    48,
      49,    38,    72,    39,    40,    41,    42,    43,    44,     2,
      45,    46,    47,    48,    49,    38,    84,    39,    40,    41,
      42,    43,    44,     2,    45,    46,    47,    48,    49,    38,
      85,    39,    40,    41,    42,    43,    44,     2,    45,    46,
      47,    48,    49,    38,    87,    39,    40,    41,    42,    43,
      44,     2,    45,    46,    47,    48,    49,    38,    93,    39,
      40,    41,    42,    43,    44,     2,    45,    46,    47,    48,
      49
};

static const yytype_int8 yycheck[] =
{
       0,    13,    37,    53,    50,    51,     5,     5,     5,     0,
       3,    14,    15,    13,    13,    13,    13,    10,     7,    69,
       7,    71,     4,     5,    70,     6,     7,     8,     9,    19,
      65,     7,     3,     7,     7,     3,    86,    37,    58,    -1,
      11,    12,    74,    14,    15,    16,    17,    82,    19,    20,
      21,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    58,    -1,
      -1,    -1,    -1,    75,    -1,    65,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    75,    -1,    -1,    -1,    -1,
      -1,     3,    82,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,    17,    18,    19,    20,    21,
       3,    -1,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    -1,    -1,    19,    20,     3,    -1,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    -1,     3,    19,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,     3,    18,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16,     3,    18,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,     3,    18,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    15,    16,     3,
      18,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    15,    16,     3,    18,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,     3,    18,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16
};

/* YYSTOS[STATE-NUM] -- The symbol kind of the accessing symbol of
   state STATE-NUM.  */
static const yytype_int8 yystos[] =
{
       0,     3,    11,    12,    14,    15,    16,    17,    19,    20,
      21,    23,    24,    25,    26,    31,    32,    34,     3,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16,    17,    18,    19,    20,    21,     7,    30,     3,     5,
       6,     7,     8,     9,    10,    12,    13,    14,    15,    16,
      19,    20,    31,    35,    36,    37,     0,     4,     5,    26,
       6,     7,     8,     9,    27,    14,    15,    24,    18,    35,
      19,    35,    18,    36,    19,    25,     7,     7,     7,    28,
       7,    24,    33,    13,    18,    18,    35,    18,    37,     3,
      29,    13,    24,    18,     3,    10,    13
};

/* YYR1[RULE-NUM] -- Symbol kind of the left-hand side of rule RULE-NUM.  */
static const yytype_int8 yyr1[] =
{
       0,    22,    23,    24,    24,    25,    25,    26,    26,    26,
      26,    26,    26,    26,    26,    26,    28,    27,    29,    29,
      30,    31,    31,    31,    31,    31,    31,    31,    31,    31,
      31,    31,    31,    31,    31,    31,    31,    31,    31,    32,
      32,    33,    32,    32,    32,    32,    32,    32,    32,    32,
      32,    32,    34,    34,    34,    34,    34,    34,    35,    35,
      36,    36,    37,    37,    37,    37,    37,    37,    37,    37,
      37,    37,    37,    37,    37
};

/* YYR2[RULE-NUM] -- Number of symbols on the right-hand side of rule RULE-NUM.  */
static const yytype_int8 yyr2[] =
{
       0,     2,     2,     1,     3,     1,     2,     1,     2,     3,
       2,     3,     2,     3,     2,     3,     0,     4,     1,     2,
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     4,
       5,     0,     6,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     3,     3,     4,     4,     4,     5,     1,     2,
       3,     1,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1
};


enum { YYENOMEM = -2 };

#define yyerrok         (yyerrstatus = 0)
#define yyclearin       (yychar = YYEMPTY)

#define YYACCEPT        goto yyacceptlab
#define YYABORT         goto yyabortlab
#define YYERROR         goto yyerrorlab
#define YYNOMEM         goto yyexhaustedlab


#define YYRECOVERING()  (!!yyerrstatus)

#define YYBACKUP(Token, Value)                                    \
  do                                                              \
    if (yychar == YYEMPTY)                                        \
      {                                                           \
        yychar = (Token);                                         \
        yylval = (Value);                                         \
        YYPOPSTACK (yylen);                                       \
        yystate = *yyssp;                                         \
        goto yybackup;                                            \
      }                                                           \
    else                                                          \
      {                                                           \
        yyerror (YY_("syntax error: cannot back up")); \
        YYERROR;                                                  \
      }                                                           \
  while (0)

/* Backward compatibility with an undocumented macro.
   Use YYerror or YYUNDEF. */
#define YYERRCODE YYUNDEF


/* Enable debugging if requested.  */
#if YYDEBUG

# ifndef YYFPRINTF
#  include <stdio.h> /* INFRINGES ON USER NAME SPACE */
#  define YYFPRINTF fprintf
# endif

# define YYDPRINTF(Args)                        \
do {                                            \
  if (yydebug)                                  \
    YYFPRINTF Args;                             \
} while (0)




# define YY_SYMBOL_PRINT(Title, Kind, Value, Location)                    \
do {                                                                      \
  if (yydebug)                                                            \
    {                                                                     \
      YYFPRINTF (stderr, "%s ", Title);                                   \
      yy_symbol_print (stderr,                                            \
                  Kind, Value); \
      YYFPRINTF (stderr, "\n");                                           \
    }                                                                     \
} while (0)


/*-----------------------------------.
| Print this symbol's value on YYO.  |
`-----------------------------------*/

static void
yy_symbol_value_print (FILE *yyo,
                       yysymbol_kind_t yykind, YYSTYPE const * const yyvaluep)
{
  FILE *yyoutput = yyo;
  YY_USE (yyoutput);
  if (!yyvaluep)
    return;
  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  YY_USE (yykind);
  YY_IGNORE_MAYBE_UNINITIALIZED_END
}


/*---------------------------.
| Print this symbol on YYO.  |
`---------------------------*/

static void
yy_symbol_print (FILE *yyo,
                 yysymbol_kind_t yykind, YYSTYPE const * const yyvaluep)
{
  YYFPRINTF (yyo, "%s %s (",
             yykind < YYNTOKENS ? "token" : "nterm", yysymbol_name (yykind));

  yy_symbol_value_print (yyo, yykind, yyvaluep);
  YYFPRINTF (yyo, ")");
}

/*------------------------------------------------------------------.
| yy_stack_print -- Print the state stack from its BOTTOM up to its |
| TOP (included).                                                   |
`------------------------------------------------------------------*/

static void
yy_stack_print (yy_state_t *yybottom, yy_state_t *yytop)
{
  YYFPRINTF (stderr, "Stack now");
  for (; yybottom <= yytop; yybottom++)
    {
      int yybot = *yybottom;
      YYFPRINTF (stderr, " %d", yybot);
    }
  YYFPRINTF (stderr, "\n");
}

# define YY_STACK_PRINT(Bottom, Top)                            \
do {                                                            \
  if (yydebug)                                                  \
    yy_stack_print ((Bottom), (Top));                           \
} while (0)


/*------------------------------------------------.
| Report that the YYRULE is going to be reduced.  |
`------------------------------------------------*/

static void
yy_reduce_print (yy_state_t *yyssp, YYSTYPE *yyvsp,
                 int yyrule)
{
  int yylno = yyrline[yyrule];
  int yynrhs = yyr2[yyrule];
  int yyi;
  YYFPRINTF (stderr, "Reducing stack by rule %d (line %d):\n",
             yyrule - 1, yylno);
  /* The symbols being reduced.  */
  for (yyi = 0; yyi < yynrhs; yyi++)
    {
      YYFPRINTF (stderr, "   $%d = ", yyi + 1);
      yy_symbol_print (stderr,
                       YY_ACCESSING_SYMBOL (+yyssp[yyi + 1 - yynrhs]),
                       &yyvsp[(yyi + 1) - (yynrhs)]);
      YYFPRINTF (stderr, "\n");
    }
}

# define YY_REDUCE_PRINT(Rule)          \
do {                                    \
  if (yydebug)                          \
    yy_reduce_print (yyssp, yyvsp, Rule); \
} while (0)

/* Nonzero means print parse trace.  It is left uninitialized so that
   multiple parsers can coexist.  */
int yydebug;
#else /* !YYDEBUG */
# define YYDPRINTF(Args) ((void) 0)
# define YY_SYMBOL_PRINT(Title, Kind, Value, Location)
# define YY_STACK_PRINT(Bottom, Top)
# define YY_REDUCE_PRINT(Rule)
#endif /* !YYDEBUG */


/* YYINITDEPTH -- initial size of the parser's stacks.  */
#ifndef YYINITDEPTH
# define YYINITDEPTH 200
#endif

/* YYMAXDEPTH -- maximum size the stacks can grow to (effective only
   if the built-in stack extension method is used).

   Do not make this value too large; the results are undefined if
   YYSTACK_ALLOC_MAXIMUM < YYSTACK_BYTES (YYMAXDEPTH)
   evaluated with infinite-precision integer arithmetic.  */

#ifndef YYMAXDEPTH
# define YYMAXDEPTH 10000
#endif






/*-----------------------------------------------.
| Release the memory associated to this symbol.  |
`-----------------------------------------------*/

static void
yydestruct (const char *yymsg,
            yysymbol_kind_t yykind, YYSTYPE *yyvaluep)
{
  YY_USE (yyvaluep);
  if (!yymsg)
    yymsg = "Deleting";
  YY_SYMBOL_PRINT (yymsg, yykind, yyvaluep, yylocationp);

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  YY_USE (yykind);
  YY_IGNORE_MAYBE_UNINITIALIZED_END
}


/* Lookahead token kind.  */
int yychar;

/* The semantic value of the lookahead symbol.  */
YYSTYPE yylval;
/* Number of syntax errors so far.  */
int yynerrs;




/*----------.
| yyparse.  |
`----------*/

int
yyparse (void)
{
    yy_state_fast_t yystate = 0;
    /* Number of tokens to shift before error messages enabled.  */
    int yyerrstatus = 0;

    /* Refer to the stacks through separate pointers, to allow yyoverflow
       to reallocate them elsewhere.  */

    /* Their size.  */
    YYPTRDIFF_T yystacksize = YYINITDEPTH;

    /* The state stack: array, bottom, top.  */
    yy_state_t yyssa[YYINITDEPTH];
    yy_state_t *yyss = yyssa;
    yy_state_t *yyssp = yyss;

    /* The semantic value stack: array, bottom, top.  */
    YYSTYPE yyvsa[YYINITDEPTH];
    YYSTYPE *yyvs = yyvsa;
    YYSTYPE *yyvsp = yyvs;

  int yyn;
  /* The return value of yyparse.  */
  int yyresult;
  /* Lookahead symbol kind.  */
  yysymbol_kind_t yytoken = YYSYMBOL_YYEMPTY;
  /* The variables used to return semantic value and location from the
     action routines.  */
  YYSTYPE yyval;



#define YYPOPSTACK(N)   (yyvsp -= (N), yyssp -= (N))

  /* The number of symbols on the RHS of the reduced rule.
     Keep to zero when no symbol should be popped.  */
  int yylen = 0;

  YYDPRINTF ((stderr, "Starting parse\n"));

  yychar = YYEMPTY; /* Cause a token to be read.  */

  goto yysetstate;


/*------------------------------------------------------------.
| yynewstate -- push a new state, which is found in yystate.  |
`------------------------------------------------------------*/
yynewstate:
  /* In all cases, when you get here, the value and location stacks
     have just been pushed.  So pushing a state here evens the stacks.  */
  yyssp++;


/*--------------------------------------------------------------------.
| yysetstate -- set current state (the top of the stack) to yystate.  |
`--------------------------------------------------------------------*/
yysetstate:
  YYDPRINTF ((stderr, "Entering state %d\n", yystate));
  YY_ASSERT (0 <= yystate && yystate < YYNSTATES);
  YY_IGNORE_USELESS_CAST_BEGIN
  *yyssp = YY_CAST (yy_state_t, yystate);
  YY_IGNORE_USELESS_CAST_END
  YY_STACK_PRINT (yyss, yyssp);

  if (yyss + yystacksize - 1 <= yyssp)
#if !defined yyoverflow && !defined YYSTACK_RELOCATE
    YYNOMEM;
#else
    {
      /* Get the current used size of the three stacks, in elements.  */
      YYPTRDIFF_T yysize = yyssp - yyss + 1;

# if defined yyoverflow
      {
        /* Give user a chance to reallocate the stack.  Use copies of
           these so that the &'s don't force the real ones into
           memory.  */
        yy_state_t *yyss1 = yyss;
        YYSTYPE *yyvs1 = yyvs;

        /* Each stack pointer address is followed by the size of the
           data in use in that stack, in bytes.  This used to be a
           conditional around just the two extra args, but that might
           be undefined if yyoverflow is a macro.  */
        yyoverflow (YY_("memory exhausted"),
                    &yyss1, yysize * YYSIZEOF (*yyssp),
                    &yyvs1, yysize * YYSIZEOF (*yyvsp),
                    &yystacksize);
        yyss = yyss1;
        yyvs = yyvs1;
      }
# else /* defined YYSTACK_RELOCATE */
      /* Extend the stack our own way.  */
      if (YYMAXDEPTH <= yystacksize)
        YYNOMEM;
      yystacksize *= 2;
      if (YYMAXDEPTH < yystacksize)
        yystacksize = YYMAXDEPTH;

      {
        yy_state_t *yyss1 = yyss;
        union yyalloc *yyptr =
          YY_CAST (union yyalloc *,
                   YYSTACK_ALLOC (YY_CAST (YYSIZE_T, YYSTACK_BYTES (yystacksize))));
        if (! yyptr)
          YYNOMEM;
        YYSTACK_RELOCATE (yyss_alloc, yyss);
        YYSTACK_RELOCATE (yyvs_alloc, yyvs);
#  undef YYSTACK_RELOCATE
        if (yyss1 != yyssa)
          YYSTACK_FREE (yyss1);
      }
# endif

      yyssp = yyss + yysize - 1;
      yyvsp = yyvs + yysize - 1;

      YY_IGNORE_USELESS_CAST_BEGIN
      YYDPRINTF ((stderr, "Stack size increased to %ld\n",
                  YY_CAST (long, yystacksize)));
      YY_IGNORE_USELESS_CAST_END

      if (yyss + yystacksize - 1 <= yyssp)
        YYABORT;
    }
#endif /* !defined yyoverflow && !defined YYSTACK_RELOCATE */


  if (yystate == YYFINAL)
    YYACCEPT;

  goto yybackup;


/*-----------.
| yybackup.  |
`-----------*/
yybackup:
  /* Do appropriate processing given the current state.  Read a
     lookahead token if we need one and don't already have one.  */

  /* First try to decide what to do without reference to lookahead token.  */
  yyn = yypact[yystate];
  if (yypact_value_is_default (yyn))
    goto yydefault;

  /* Not known => get a lookahead token if don't already have one.  */

  /* YYCHAR is either empty, or end-of-input, or a valid lookahead.  */
  if (yychar == YYEMPTY)
    {
      YYDPRINTF ((stderr, "Reading a token\n"));
      yychar = yylex ();
    }

  if (yychar <= YYEOF)
    {
      yychar = YYEOF;
      yytoken = YYSYMBOL_YYEOF;
      YYDPRINTF ((stderr, "Now at end of input.\n"));
    }
  else if (yychar == YYerror)
    {
      /* The scanner already issued an error message, process directly
         to error recovery.  But do not keep the error token as
         lookahead, it is too special and may lead us to an endless
         loop in error recovery. */
      yychar = YYUNDEF;
      yytoken = YYSYMBOL_YYerror;
      goto yyerrlab1;
    }
  else
    {
      yytoken = YYTRANSLATE (yychar);
      YY_SYMBOL_PRINT ("Next token is", yytoken, &yylval, &yylloc);
    }

  /* If the proper action on seeing token YYTOKEN is to reduce or to
     detect an error, take that action.  */
  yyn += yytoken;
  if (yyn < 0 || YYLAST < yyn || yycheck[yyn] != yytoken)
    goto yydefault;
  yyn = yytable[yyn];
  if (yyn <= 0)
    {
      if (yytable_value_is_error (yyn))
        goto yyerrlab;
      yyn = -yyn;
      goto yyreduce;
    }

  /* Count tokens shifted since error; after three, turn off error
     status.  */
  if (yyerrstatus)
    yyerrstatus--;

  /* Shift the lookahead token.  */
  YY_SYMBOL_PRINT ("Shifting", yytoken, &yylval, &yylloc);
  yystate = yyn;
  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END

  /* Discard the shifted token.  */
  yychar = YYEMPTY;
  goto yynewstate;


/*-----------------------------------------------------------.
| yydefault -- do the default action for the current state.  |
`-----------------------------------------------------------*/
yydefault:
  yyn = yydefact[yystate];
  if (yyn == 0)
    goto yyerrlab;
  goto yyreduce;


/*-----------------------------.
| yyreduce -- do a reduction.  |
`-----------------------------*/
yyreduce:
  /* yyn is the number of a rule to reduce with.  */
  yylen = yyr2[yyn];

  /* If YYLEN is nonzero, implement the default value of the action:
     '$$ = $1'.

     Otherwise, the following line sets YYVAL to garbage.
     This behavior is undocumented and Bison
     users should not rely upon it.  Assigning to YYVAL
     unconditionally makes the parser a bit smaller, and it avoids a
     GCC warning that YYVAL may be used uninitialized.  */
  yyval = yyvsp[1-yylen];


  YY_REDUCE_PRINT (yyn);
  switch (yyn)
    {
  case 2: /* line: alt EOL  */
#line 82 "parse.y"
        {
		parsed_regexp = (yyvsp[-1].re);
		return 1;
	}
#line 1301 "y.tab.c"
    break;

  case 4: /* alt: alt '|' concat  */
#line 91 "parse.y"
        {
		(yyval.re) = reg(Alt, (yyvsp[-2].re), (yyvsp[0].re));
	}
#line 1309 "y.tab.c"
    break;

  case 6: /* concat: concat repeat  */
#line 99 "parse.y"
        {
		(yyval.re) = reg(Cat, (yyvsp[-1].re), (yyvsp[0].re));
	}
#line 1317 "y.tab.c"
    break;

  case 8: /* repeat: single '*'  */
#line 107 "parse.y"
        {
		(yyval.re) = reg(Star, (yyvsp[-1].re), nil);
	}
#line 1325 "y.tab.c"
    break;

  case 9: /* repeat: single '*' '?'  */
#line 111 "parse.y"
        {
		(yyval.re) = reg(Star, (yyvsp[-2].re), nil);
		(yyval.re)->n = 1;
	}
#line 1334 "y.tab.c"
    break;

  case 10: /* repeat: single '+'  */
#line 116 "parse.y"
        {
		(yyval.re) = reg(Plus, (yyvsp[-1].re), nil);
	}
#line 1342 "y.tab.c"
    break;

  case 11: /* repeat: single '+' '?'  */
#line 120 "parse.y"
        {
		(yyval.re) = reg(Plus, (yyvsp[-2].re), nil);
		(yyval.re)->n = 1;
	}
#line 1351 "y.tab.c"
    break;

  case 12: /* repeat: single '?'  */
#line 125 "parse.y"
        {
		(yyval.re) = reg(Quest, (yyvsp[-1].re), nil);
	}
#line 1359 "y.tab.c"
    break;

  case 13: /* repeat: single '?' '?'  */
#line 129 "parse.y"
        {
		(yyval.re) = reg(Quest, (yyvsp[-2].re), nil);
		(yyval.re)->n = 1;
	}
#line 1368 "y.tab.c"
    break;

  case 14: /* repeat: single curly  */
#line 134 "parse.y"
        {
		(yyval.re) = (yyvsp[0].re);
		(yyval.re)->left = (yyvsp[-1].re);
	}
#line 1377 "y.tab.c"
    break;

  case 15: /* repeat: single curly '?'  */
#line 139 "parse.y"
        {
		(yyval.re) = (yyvsp[-1].re);
		(yyval.re)->left = (yyvsp[-2].re);
		(yyval.re)->n = 1;
	}
#line 1387 "y.tab.c"
    break;

  case 16: /* $@1: %empty  */
#line 148 "parse.y"
        {
		_curlyStringIx = 0;
	}
#line 1395 "y.tab.c"
    break;

  case 17: /* curly: '{' $@1 curlyString '}'  */
#line 152 "parse.y"
        {
		_curlyString[_curlyStringIx] = '\0';
		curlyNumbers cn = parseCurlies(_curlyString);
		(yyval.re) = reg(Curly, nil, nil);
		(yyval.re)->curlyMin = cn.min;
		(yyval.re)->curlyMax = cn.max;
	}
#line 1407 "y.tab.c"
    break;

  case 18: /* curlyString: CHAR  */
#line 163 "parse.y"
        {
		_handleCurlyChar((yyvsp[0].c));
		(yyval.curlyString) = _curlyString;
	}
#line 1416 "y.tab.c"
    break;

  case 19: /* curlyString: curlyString CHAR  */
#line 168 "parse.y"
        {
		_handleCurlyChar((yyvsp[0].c));
		(yyval.curlyString) = _curlyString;
	}
#line 1425 "y.tab.c"
    break;

  case 20: /* count: %empty  */
#line 175 "parse.y"
        {
		(yyval.nparen) = ++nparen;
	}
#line 1433 "y.tab.c"
    break;

  case 21: /* escape: '\\' CHAR  */
#line 183 "parse.y"
        {
		// Is it a ZWA (\b \A etc.) or a normal char escape?
		if ((yyvsp[0].c) == 'b' || (yyvsp[0].c) == 'B' || (yyvsp[0].c) == 'A' || (yyvsp[0].c) == 'Z' || (yyvsp[0].c) == 'z') {
			(yyval.re) = reg(InlineZWA, nil, nil);
		} else {
			(yyval.re) = reg(CharEscape, nil, nil);
		}
		(yyval.re)->ch = (yyvsp[0].c);
	}
#line 1447 "y.tab.c"
    break;

  case 22: /* escape: '\\' '|'  */
#line 193 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '|';
	}
#line 1456 "y.tab.c"
    break;

  case 23: /* escape: '\\' '*'  */
#line 198 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '*';
	}
#line 1465 "y.tab.c"
    break;

  case 24: /* escape: '\\' '+'  */
#line 203 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '+';
	}
#line 1474 "y.tab.c"
    break;

  case 25: /* escape: '\\' '?'  */
#line 208 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '?';
	}
#line 1483 "y.tab.c"
    break;

  case 26: /* escape: '\\' '('  */
#line 213 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '(';
	}
#line 1492 "y.tab.c"
    break;

  case 27: /* escape: '\\' ')'  */
#line 218 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = ')';
	}
#line 1501 "y.tab.c"
    break;

  case 28: /* escape: '\\' '{'  */
#line 223 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '{';
	}
#line 1510 "y.tab.c"
    break;

  case 29: /* escape: '\\' '}'  */
#line 228 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '}';
	}
#line 1519 "y.tab.c"
    break;

  case 30: /* escape: '\\' ':'  */
#line 233 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = ':';
	}
#line 1528 "y.tab.c"
    break;

  case 31: /* escape: '\\' '='  */
#line 238 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '=';
	}
#line 1537 "y.tab.c"
    break;

  case 32: /* escape: '\\' '.'  */
#line 243 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '.';
	}
#line 1546 "y.tab.c"
    break;

  case 33: /* escape: '\\' '['  */
#line 248 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '[';
	}
#line 1555 "y.tab.c"
    break;

  case 34: /* escape: '\\' ']'  */
#line 253 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = ']';
	}
#line 1564 "y.tab.c"
    break;

  case 35: /* escape: '\\' '-'  */
#line 258 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '-';
	}
#line 1573 "y.tab.c"
    break;

  case 36: /* escape: '\\' '\\'  */
#line 263 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '\\';
	}
#line 1582 "y.tab.c"
    break;

  case 37: /* escape: '\\' '^'  */
#line 268 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '^';
	}
#line 1591 "y.tab.c"
    break;

  case 38: /* escape: '\\' '$'  */
#line 273 "parse.y"
        {
		(yyval.re) = reg(CharEscape, nil, nil);
		(yyval.re)->ch = '$';
	}
#line 1600 "y.tab.c"
    break;

  case 39: /* single: '(' count alt ')'  */
#line 281 "parse.y"
        {
		if (DISABLE_CAPTURES) {
			(yyval.re) = (yyvsp[-1].re);
		}
		else {
			(yyval.re) = reg(Paren, (yyvsp[-1].re), nil);
			(yyval.re)->n = (yyvsp[-2].nparen);
		}
	}
#line 1614 "y.tab.c"
    break;

  case 40: /* single: '(' '?' ':' alt ')'  */
#line 291 "parse.y"
        {
		(yyval.re) = (yyvsp[-1].re);
	}
#line 1622 "y.tab.c"
    break;

  case 41: /* $@2: %empty  */
#line 295 "parse.y"
        {
		//printf("Lookahead a\n");
		DISABLE_CAPTURES = 1;
	}
#line 1631 "y.tab.c"
    break;

  case 42: /* single: '(' '?' '=' $@2 alt ')'  */
#line 300 "parse.y"
        {
		//printf("Lookahead b\n");
		(yyval.re) = reg(Lookahead, (yyvsp[-1].re), nil);
		DISABLE_CAPTURES = 0;
	}
#line 1641 "y.tab.c"
    break;

  case 43: /* single: escape  */
#line 306 "parse.y"
        {
		(yyval.re) = (yyvsp[0].re);
	}
#line 1649 "y.tab.c"
    break;

  case 44: /* single: ':'  */
#line 310 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = ':';
	}
#line 1658 "y.tab.c"
    break;

  case 45: /* single: '='  */
#line 315 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '=';
	}
#line 1667 "y.tab.c"
    break;

  case 46: /* single: ccc  */
#line 320 "parse.y"
        {
		(yyval.re) = (yyvsp[0].re);
	}
#line 1675 "y.tab.c"
    break;

  case 47: /* single: CHAR  */
#line 324 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = (yyvsp[0].c);
	}
#line 1684 "y.tab.c"
    break;

  case 48: /* single: '.'  */
#line 329 "parse.y"
        {
		(yyval.re) = reg(Dot, nil, nil);
	}
#line 1692 "y.tab.c"
    break;

  case 49: /* single: '-'  */
#line 333 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '-';
	}
#line 1701 "y.tab.c"
    break;

  case 50: /* single: '^'  */
#line 338 "parse.y"
        {
		(yyval.re) = reg(InlineZWA, nil, nil);
		(yyval.re)->ch = '^';
	}
#line 1710 "y.tab.c"
    break;

  case 51: /* single: '$'  */
#line 343 "parse.y"
        {
		(yyval.re) = reg(InlineZWA, nil, nil);
		(yyval.re)->ch = '$';
	}
#line 1719 "y.tab.c"
    break;

  case 52: /* ccc: '[' '-' ']'  */
#line 351 "parse.y"
        {
		(yyval.re) = reg(CustomCharClass, nil, nil);
		(yyval.re)->plusDash = 1;
	}
#line 1728 "y.tab.c"
    break;

  case 53: /* ccc: '[' charRanges ']'  */
#line 356 "parse.y"
        {
		(yyval.re) = reg(CustomCharClass, (yyvsp[-1].re), nil);
		(yyval.re)->plusDash = 0;
		(yyval.re)->ccInvert = 0;
	}
#line 1738 "y.tab.c"
    break;

  case 54: /* ccc: '[' '-' charRanges ']'  */
#line 364 "parse.y"
        {
		(yyval.re) = reg(CustomCharClass, (yyvsp[-1].re), nil);
		(yyval.re)->plusDash = 1;
		(yyval.re)->ccInvert = 0;
	}
#line 1748 "y.tab.c"
    break;

  case 55: /* ccc: '[' '^' '-' ']'  */
#line 371 "parse.y"
        {
		(yyval.re) = reg(CustomCharClass, nil, nil);
		(yyval.re)->plusDash = 1;
		(yyval.re)->ccInvert = 1;
	}
#line 1758 "y.tab.c"
    break;

  case 56: /* ccc: '[' '^' charRanges ']'  */
#line 377 "parse.y"
        {
		(yyval.re) = reg(CustomCharClass, (yyvsp[-1].re), nil);
		(yyval.re)->ccInvert = 1;
	}
#line 1767 "y.tab.c"
    break;

  case 57: /* ccc: '[' '^' '-' charRanges ']'  */
#line 382 "parse.y"
        {
		(yyval.re) = reg(CustomCharClass, (yyvsp[-1].re), nil);
		(yyval.re)->plusDash = 1;
		(yyval.re)->ccInvert = 1;
	}
#line 1777 "y.tab.c"
    break;

  case 59: /* charRanges: charRanges charRange  */
#line 393 "parse.y"
        {
		//printf("charRanges\n");
		(yyval.re) = (yyvsp[0].re);
		(yyval.re)->left = (yyvsp[-1].re);
	}
#line 1787 "y.tab.c"
    break;

  case 60: /* charRange: charRangeChar '-' charRangeChar  */
#line 402 "parse.y"
        {
		//printf("charRangeChar - charRangeChar\n");
		(yyval.re) = reg(CharRange, nil, nil);
		(yyval.re)->ccLow = (yyvsp[-2].re);
		(yyval.re)->ccHigh = (yyvsp[0].re);
	}
#line 1798 "y.tab.c"
    break;

  case 61: /* charRange: charRangeChar  */
#line 409 "parse.y"
        {
		//printf("charRangeChar\n");
		(yyval.re) = reg(CharRange, nil, nil);
		(yyval.re)->ccLow = (yyvsp[0].re);
		(yyval.re)->ccHigh = (yyvsp[0].re);
	}
#line 1809 "y.tab.c"
    break;

  case 62: /* charRangeChar: CHAR  */
#line 423 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = (yyvsp[0].c);
	}
#line 1818 "y.tab.c"
    break;

  case 64: /* charRangeChar: '.'  */
#line 429 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '.';
	}
#line 1827 "y.tab.c"
    break;

  case 65: /* charRangeChar: ':'  */
#line 434 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = ':';
	}
#line 1836 "y.tab.c"
    break;

  case 66: /* charRangeChar: '='  */
#line 439 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '=';
	}
#line 1845 "y.tab.c"
    break;

  case 67: /* charRangeChar: '*'  */
#line 444 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '*';
	}
#line 1854 "y.tab.c"
    break;

  case 68: /* charRangeChar: '+'  */
#line 449 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '+';
	}
#line 1863 "y.tab.c"
    break;

  case 69: /* charRangeChar: '?'  */
#line 454 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '?';
	}
#line 1872 "y.tab.c"
    break;

  case 70: /* charRangeChar: '('  */
#line 459 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '(';
	}
#line 1881 "y.tab.c"
    break;

  case 71: /* charRangeChar: ')'  */
#line 464 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = ')';
	}
#line 1890 "y.tab.c"
    break;

  case 72: /* charRangeChar: '{'  */
#line 469 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '{';
	}
#line 1899 "y.tab.c"
    break;

  case 73: /* charRangeChar: '}'  */
#line 474 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '}';
	}
#line 1908 "y.tab.c"
    break;

  case 74: /* charRangeChar: '|'  */
#line 479 "parse.y"
        {
		(yyval.re) = reg(Lit, nil, nil);
		(yyval.re)->ch = '|';
	}
#line 1917 "y.tab.c"
    break;


#line 1921 "y.tab.c"

      default: break;
    }
  /* User semantic actions sometimes alter yychar, and that requires
     that yytoken be updated with the new translation.  We take the
     approach of translating immediately before every use of yytoken.
     One alternative is translating here after every semantic action,
     but that translation would be missed if the semantic action invokes
     YYABORT, YYACCEPT, or YYERROR immediately after altering yychar or
     if it invokes YYBACKUP.  In the case of YYABORT or YYACCEPT, an
     incorrect destructor might then be invoked immediately.  In the
     case of YYERROR or YYBACKUP, subsequent parser actions might lead
     to an incorrect destructor call or verbose syntax error message
     before the lookahead is translated.  */
  YY_SYMBOL_PRINT ("-> $$ =", YY_CAST (yysymbol_kind_t, yyr1[yyn]), &yyval, &yyloc);

  YYPOPSTACK (yylen);
  yylen = 0;

  *++yyvsp = yyval;

  /* Now 'shift' the result of the reduction.  Determine what state
     that goes to, based on the state we popped back to and the rule
     number reduced by.  */
  {
    const int yylhs = yyr1[yyn] - YYNTOKENS;
    const int yyi = yypgoto[yylhs] + *yyssp;
    yystate = (0 <= yyi && yyi <= YYLAST && yycheck[yyi] == *yyssp
               ? yytable[yyi]
               : yydefgoto[yylhs]);
  }

  goto yynewstate;


/*--------------------------------------.
| yyerrlab -- here on detecting error.  |
`--------------------------------------*/
yyerrlab:
  /* Make sure we have latest lookahead translation.  See comments at
     user semantic actions for why this is necessary.  */
  yytoken = yychar == YYEMPTY ? YYSYMBOL_YYEMPTY : YYTRANSLATE (yychar);
  /* If not already recovering from an error, report this error.  */
  if (!yyerrstatus)
    {
      ++yynerrs;
      yyerror (YY_("syntax error"));
    }

  if (yyerrstatus == 3)
    {
      /* If just tried and failed to reuse lookahead token after an
         error, discard it.  */

      if (yychar <= YYEOF)
        {
          /* Return failure if at end of input.  */
          if (yychar == YYEOF)
            YYABORT;
        }
      else
        {
          yydestruct ("Error: discarding",
                      yytoken, &yylval);
          yychar = YYEMPTY;
        }
    }

  /* Else will try to reuse lookahead token after shifting the error
     token.  */
  goto yyerrlab1;


/*---------------------------------------------------.
| yyerrorlab -- error raised explicitly by YYERROR.  |
`---------------------------------------------------*/
yyerrorlab:
  /* Pacify compilers when the user code never invokes YYERROR and the
     label yyerrorlab therefore never appears in user code.  */
  if (0)
    YYERROR;
  ++yynerrs;

  /* Do not reclaim the symbols of the rule whose action triggered
     this YYERROR.  */
  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);
  yystate = *yyssp;
  goto yyerrlab1;


/*-------------------------------------------------------------.
| yyerrlab1 -- common code for both syntax error and YYERROR.  |
`-------------------------------------------------------------*/
yyerrlab1:
  yyerrstatus = 3;      /* Each real token shifted decrements this.  */

  /* Pop stack until we find a state that shifts the error token.  */
  for (;;)
    {
      yyn = yypact[yystate];
      if (!yypact_value_is_default (yyn))
        {
          yyn += YYSYMBOL_YYerror;
          if (0 <= yyn && yyn <= YYLAST && yycheck[yyn] == YYSYMBOL_YYerror)
            {
              yyn = yytable[yyn];
              if (0 < yyn)
                break;
            }
        }

      /* Pop the current state because it cannot handle the error token.  */
      if (yyssp == yyss)
        YYABORT;


      yydestruct ("Error: popping",
                  YY_ACCESSING_SYMBOL (yystate), yyvsp);
      YYPOPSTACK (1);
      yystate = *yyssp;
      YY_STACK_PRINT (yyss, yyssp);
    }

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END


  /* Shift the error token.  */
  YY_SYMBOL_PRINT ("Shifting", YY_ACCESSING_SYMBOL (yyn), yyvsp, yylsp);

  yystate = yyn;
  goto yynewstate;


/*-------------------------------------.
| yyacceptlab -- YYACCEPT comes here.  |
`-------------------------------------*/
yyacceptlab:
  yyresult = 0;
  goto yyreturnlab;


/*-----------------------------------.
| yyabortlab -- YYABORT comes here.  |
`-----------------------------------*/
yyabortlab:
  yyresult = 1;
  goto yyreturnlab;


/*-----------------------------------------------------------.
| yyexhaustedlab -- YYNOMEM (memory exhaustion) comes here.  |
`-----------------------------------------------------------*/
yyexhaustedlab:
  yyerror (YY_("memory exhausted"));
  yyresult = 2;
  goto yyreturnlab;


/*----------------------------------------------------------.
| yyreturnlab -- parsing is finished, clean up and return.  |
`----------------------------------------------------------*/
yyreturnlab:
  if (yychar != YYEMPTY)
    {
      /* Make sure we have latest lookahead translation.  See comments at
         user semantic actions for why this is necessary.  */
      yytoken = YYTRANSLATE (yychar);
      yydestruct ("Cleanup: discarding lookahead",
                  yytoken, &yylval);
    }
  /* Do not reclaim the symbols of the rule whose action triggered
     this YYABORT or YYACCEPT.  */
  YYPOPSTACK (yylen);
  YY_STACK_PRINT (yyss, yyssp);
  while (yyssp != yyss)
    {
      yydestruct ("Cleanup: popping",
                  YY_ACCESSING_SYMBOL (+*yyssp), yyvsp);
      YYPOPSTACK (1);
    }
#ifndef yyoverflow
  if (yyss != yyssa)
    YYSTACK_FREE (yyss);
#endif

  return yyresult;
}

#line 486 "parse.y"


static char *input;
static Regexp *parsed_regexp;
static int nparen;
int gen;

static int
yylex(void)
{
	int c;

	if (input == NULL || *input == 0)
		return EOL;
	c = *input++;
	if (strchr("^|*+?(){}:=.\\[^-]$", c))
		return c;
	yylval.c = c;
	return CHAR;
}

void
fatal(char *fmt, ...)
{
	va_list arg;
	
	va_start(arg, fmt);
	fprintf(stderr, "fatal error: ");
	vfprintf(stderr, fmt, arg);
	fprintf(stderr, "\n");
	va_end(arg);
	exit(2);
}

static void
yyerror(char *s)
{
	fatal("%s", s);
}

static int
startsWithAnchor(Regexp *r)
{
	Regexp *curr = r;
	while (curr != NULL) {
		switch (curr->type) {
		case InlineZWA:
			if (curr->ch == '^' || curr->ch == 'A')
				return 1;
			else
				return 0;
		case Alt:
		case Cat:
				curr = curr->left;
				break;
		default:
			return 0;
		}
	}

	return 0;
}

static int
endsWithAnchor(Regexp *r)
{
	Regexp *curr = r;
	while (curr != NULL) {
		switch (curr->type) {
		case InlineZWA:
			if (curr->ch == '$' || curr->ch == 'z' || curr->ch == 'Z')
				return 1;
			else
				return 0;
		case Alt:
		case Cat:
			curr = curr->right;
			break;
		default:
			return 0;
		}
	}

	return 0;
}

static void
_moveDashToBeginningOfCCC(char *s)
{
	int len = strlen(s);
	int i, j;

	int start = 0;
	int esc = 0;
	int inCCC = 0;
	int negated = 0;
	for (i = 0; i < len; i++) {
		if (esc) {
			esc = 0;
			continue;
		}

		if (s[i] == '\\') {
			esc = 1;
			continue;
		}

		if (inCCC && s[i] == '-' && s[i+1] == ']') {
			// Switcheroo
			int newLoc = negated ? start + 2 : start + 1;

			// Copy rest right
			for (j = i; j >= newLoc; j--) {
				s[j] = s[j-1];
			}

			// Move - left
			s[newLoc] = '-';
		}

		if (s[i] == '[') {
			inCCC = 1;
			negated = 0;
			start = i;
		}
		if (s[i] == '^' && inCCC && start == i-1) {
			negated = 1;
		}
		if (s[i] == ']') {
			inCCC = 0;
		}
	}

	return;
}

static void
rewriteSyntax(char *s)
{
	logMsg(LOG_DEBUG, "rewriteSyntax: Before /%s/\n", s); 
	_moveDashToBeginningOfCCC(s);
	logMsg(LOG_DEBUG, "rewriteSyntax: After /%s/\n", s); 
}


Regexp*
parse(char *s)
{
	Regexp *r, *combine;

	rewriteSyntax(s);

	input = s;
	parsed_regexp = nil;
	nparen = 0;
	if(yyparse() != 1)
		yyerror("did not parse");
	if(parsed_regexp == nil)
		yyerror("parser nil");
	
	logMsg(LOG_INFO, "parsed_regexp\n"); 
	// printre(parsed_regexp);  // silenced: debug AST dump on every parse
	// printf("\n");
		
	r = reg(Paren, parsed_regexp, nil);	// $0 parens

	/* Tack on the dotstars */
	combine = r;
	/* This is imperfect, e.g. (^...), but it should cover most regexes. */
	logMsg(LOG_INFO, "parsed_regexp type %d\n", parsed_regexp->type);
	int startAnchor = startsWithAnchor(parsed_regexp);
	if (startAnchor) {
		logMsg(LOG_INFO, "Starts with anchor\n");
	} else {
		logMsg(LOG_INFO, "No ^, tacking on leading .*");
		Regexp *bolDotstar = reg(Star, reg(Dot, nil, nil), nil);
		bolDotstar->n = 1;	// non-greedy
		combine = reg(Cat, bolDotstar, combine);
	}

	int endAnchor = endsWithAnchor(parsed_regexp);
	if (endAnchor) {
		logMsg(LOG_INFO, "Ends with anchor\n");
	} else {
		logMsg(LOG_INFO, "No $, tacking on trailing .*");
		Regexp *eolDotstar = reg(Star, reg(Dot, nil, nil), nil);
		eolDotstar->n = 1;	// non-greedy
		combine = reg(Cat, combine, eolDotstar);
	}
	combine->bolAnchor = parsed_regexp->bolAnchor;
	combine->eolAnchor = parsed_regexp->eolAnchor;

	return combine;
}

void*
mal(int n)
{
	void *v;
	
	v = malloc(n);
	if(v == nil)
		fatal("out of memory");
	memset(v, 0, n);
	return v;
}	
