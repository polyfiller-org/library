import {Type} from "./type";
import {assertType} from "./assert";
import {Get} from "./get";
import {IsCallable} from "./is-callable";
import {Call} from "./call";
import {makeList} from "../lib/list/list";
import {RequireInternalSlot} from "./require-internal-slot";
import {RegExpBuiltinExec} from "./reg-exp-builtin-exec";

/**
 * https://tc39.es/ecma262/#sec-regexpexec
 */
export function RegExpExec(R: RegExp, S: string): RegExpExecArray | null {
	// Assert: Type(R) is Object.
	assertType(R, "Object");

	// Assert: Type(S) is String.
	assertType(S, "String");

	// Let exec be ? Get(R, "exec").
	const exec = Get(R, "exec");

	// If IsCallable(exec) is true, then
	if (IsCallable(exec) === true) {
		// Let result be ? Call(exec, R, « S »).
		const result = Call(exec, R, makeList(S));

		// If Type(result) is neither Object nor Null, throw a TypeError exception.
		if (Type(result) !== "Object" && Type(result) !== "Null") {
			throw new TypeError();
		}

		// Return result.
		return result;
	}

	// Perform ? RequireInternalSlot(R, [[RegExpMatcher]]).
	RequireInternalSlot(R, "[[RegExpMatcher]]");

	// Return ? RegExpBuiltinExec(R, S).
	return RegExpBuiltinExec(R, S);
}
