import {assertType} from "./assert";
import {ToNumber} from "./to-number";
import {SameValue} from "./same-value";
import {ToString} from "./to-string";

/**
 * The abstract operation CanonicalNumericIndexString returns argument converted to a numeric value
 * if it is a String representation of a Number that would be produced by ToString, or the string "-0".
 * Otherwise, it returns undefined.
 * https://tc39.es/ecma262/#sec-canonicalnumericindexstring
 * @param {PropertyKey} argument
 * @return {number?}
 */
export function CanonicalNumericIndexString(argument: PropertyKey): number | undefined {
	// Assert: Type(argument) is String.
	assertType(argument, "String", `Argument on position 0 must be of type String`, TypeError);

	// If argument is "-0", return -0.
	if (argument === "-0") return -0;

	// Let n be ! ToNumber(argument).
	const n = ToNumber(argument);

	// If SameValue(! ToString(n), argument) is false, return undefined.
	if (!SameValue(ToString(n), argument)) {
		return undefined;
	}

	// Return n.
	return n;
}
