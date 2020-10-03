import {assertType} from "../../abstract-operation/assert";
import {Type} from "../../abstract-operation/type";
import {ToString} from "../../abstract-operation/to-string";
import {IsArrayIndex} from "../../abstract-operation/is-array-index";
import {ToInteger} from "../../abstract-operation/to-integer";
import {List, makeList} from "../../lib/list/list";
import {safeHasOwnProperty} from "../../util/safe-has-own-property";

/**
 * https://tc39.es/ecma262/#sec-string-exotic-objects-ownpropertykeys
 * @private
 * @returns
 */
export function __StringOwnPropertyKeys__<T extends string>(this: T): List<PropertyKey> {
	// Let keys be a new empty List.
	const keys = makeList<PropertyKey>();

	// Let str be O.[[StringData]].
	const str = this;

	// Assert: Type(str) is String.
	assertType(str, "String");

	// Let len be the length of str.
	const len = str.length;

	// For each integer i starting with 0 such that i < len, in ascending order, do
	for (let i = 0; i < len; i++) {
		// Add ! ToString(i) as the last element of keys.
		keys.append(ToString(i));
	}

	// For each own property key P of O such that P is an array index and ToInteger(P) ≥ len,
	// in ascending numeric index order, do
	for (const P in this) {
		if (!safeHasOwnProperty(this, P)) continue;
		if (!IsArrayIndex(P)) continue;
		if (ToInteger(P) < len) continue;

		// Add P as the last element of keys.
		keys.append(P);
	}

	// For each own property key P of O such that Type(P) is String and
	// P is not an array index, in ascending chronological order of property creation, do
	for (const P in this) {
		if (!safeHasOwnProperty(this, P)) continue;
		if (Type(P) !== "String") continue;
		if (IsArrayIndex(P)) continue;

		// Add P as the last element of keys.
		keys.append(P);
	}

	// For each own property key P of O such that Type(P) is Symbol,
	// in ascending chronological order of property creation, do
	for (const P in this) {
		if (!safeHasOwnProperty(this, P)) continue;
		if (Type(P as symbol) !== "Symbol") continue;

		// Add P as the last element of keys.
		keys.append(P);
	}

	// Return keys.
	return keys;
}
