import {assert, assertType} from "./assert";
import {IsInteger} from "./is-integer";
import {CodePointAt} from "./code-point-at";
import {getAmountOfCodeUnits} from "../algorithm/code-unit";

/**
 * https://tc39.es/ecma262/#sec-advancestringindex
 */
export function AdvanceStringIndex(S: string, index: number, unicode: boolean): number {
	// Assert: Type(S) is String.
	assertType(S, "String");

	// Assert: 0 ≤ index ≤ 253 - 1 and ! IsInteger(index) is true.
	assert(index >= 0 && index <= 253 - 1 && IsInteger(index));

	// Assert: Type(unicode) is Boolean.
	assertType(unicode, "Boolean");

	// If unicode is false, return index + 1.
	if (unicode === false) {
		return index + 1;
	}

	// Let length be the number of code units in S.
	const length = getAmountOfCodeUnits(S);

	// If index + 1 ≥ length, return index + 1.
	if (index + 1 >= length) {
		return index + 1;
	}

	// Let cp be ! CodePointAt(S, index).
	const cp = CodePointAt(S, index);

	// Return index + cp.[[CodeUnitCount]].
	return index + cp["[[CodeUnitCount]]"];
}
