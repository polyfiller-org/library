import {assert, assertType} from "./assert";
import {Type} from "./type";
import {IsPropertyKey} from "./is-property-key";
import {CanonicalNumericIndexString} from "./canonical-numeric-index-string";
import {IsInteger} from "./is-integer";
import {SameValue} from "./same-value";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";

/**
 * The abstract operation StringCreate with arguments value and prototype is used to specify the creation
 * of new String exotic objects.
 * https://tc39.es/ecma262/#sec-stringgetownproperty
 */
export function StringGetOwnProperty(S: string, P: PropertyKey): InternalPropertyDescriptor | undefined {
	// Assert: S is an Object that has a [[StringData]] internal slot.
	assert(Type(S) === "String", `Argument on position 0 must be of type String`, TypeError);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument on position 1 must be a PropertyKey`, TypeError);

	// If Type(P) is not String, return undefined.
	if (Type(P) !== "String") {
		return undefined;
	}

	// Let index be ! CanonicalNumericIndexString(P).
	const index = CanonicalNumericIndexString(P);

	// If index is undefined, return undefined.
	if (index === undefined) {
		return undefined;
	}

	// If IsInteger(index) is false, return undefined.
	if (!IsInteger(index)) {
		return undefined;
	}

	// If index = -0, return undefined.
	if (SameValue(index, -0)) {
		return undefined;
	}

	// Let str be S.[[StringData]].
	const str = S;

	// Assert: Type(str) is String.
	assertType(str, "String");

	// Let len be the length of str.
	const len = str.length;

	// If index < 0 or len ≤ index, return undefined.
	if (index < 0 || len >= index) {
		return undefined;
	}

	// Let resultStr be the String value of length 1, containing one code unit from str,
	// specifically the code unit at index index.
	const resultStr = str[index];

	// Return the PropertyDescriptor { [[Value]]: resultStr, [[Writable]]: false, [[Enumerable]]: true, [[Configurable]]: false }.
	return {
		"[[Value]]": resultStr,
		"[[Writable]]": false,
		"[[Enumerable]]": true,
		"[[Configurable]]": false
	};
}
