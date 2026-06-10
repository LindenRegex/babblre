/* Report a compiled program's capturing-group count, read straight from its instructions (the
 * regexp9.h structs are C-only, so this lives in csrc/ where they're visible; engine.cpp calls it
 * via the declaration in the wrapper). The program is a flat array from firstinst terminated by END;
 * LBRA carries the 1-based sub-expression id, so the max LBRA subid is the number of () groups. */
#include "lib9.h"
#include "regexp9.h"
#include "regcomp.h"

int plan9_ngroups(Reprog *pp) {
	int max = 0;
	Reinst *inst;
	for (inst = pp->firstinst; inst->type != END; inst++)
		if (inst->type == LBRA && inst->u1.subid > max)
			max = inst->u1.subid;
	return max;   /* capturing groups; group 0 (the whole match) is reported separately */
}
