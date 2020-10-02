import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";
import {ToString} from "../../abstract-operation/to-string";
import {RegExpBuiltinExec} from "../../abstract-operation/reg-exp-builtin-exec";

/**
 * https://tc39.es/ecma262/#sec-regexp.prototype.exec
 */
export const {exec: regExpPrototypeExec} = {
	exec(this: RegExp, string: string): RegExpExecArray | null {
		// Let R be the this value.
		const R = this;

		// Perform ? RequireInternalSlot(R, [[RegExpMatcher]]).
		RequireInternalSlot(R, "[[RegExpMatcher]]");

		// Let S be ? ToString(string).
		const S = ToString(string);

		// Return ? RegExpBuiltinExec(R, S).
		return RegExpBuiltinExec(R, S);
	}
};
