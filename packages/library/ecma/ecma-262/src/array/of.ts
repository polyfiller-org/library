import {IsConstructor} from "../abstract-operation/is-constructor";
import {Construct} from "../abstract-operation/construct";
import {Set} from "../abstract-operation/set";
import {ArrayCreate} from "../abstract-operation/array-create";
import {ToString} from "../abstract-operation/to-string";
import {CreateDataPropertyOrThrow} from "../abstract-operation/create-data-property-or-throw";
import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-array.of
 */
function of<T>(this: T[]): T[] {
	let A: T[];

	if (new.target != null) {
		throw new TypeError(`Array.of is not a constructor`);
	}

	// Let len be the actual number of arguments passed to this function.
	const len = arguments.length;

	// Let items be the List of arguments passed to this function.
	const items = arguments;

	// Let C be the this value.
	const C = this;

	// If IsConstructor(C) is true, then
	if (IsConstructor(C)) {
		// Let A be ? Construct(C, « len »).
		A = Construct(C, makeList(len));
	}

	// Else,
	else {
		// Let A be ? ArrayCreate(len).
		A = ArrayCreate(len);
	}

	// Let k be 0.
	let k = 0;

	// Repeat, while k < len
	while (k < len) {
		// Let kValue be items[k].
		const kValue = items[k];

		// Let Pk be ! ToString(k).
		const Pk = ToString(k);

		// Perform ? CreateDataPropertyOrThrow(A, Pk, kValue).
		CreateDataPropertyOrThrow(A, Pk, kValue);

		// Set k to k + 1.
		k = k + 1;
	}

	// Perform ? Set(A, "length", len, true).
	Set(A, "length", len, true);

	// Return A.
	return A;
}

export {of as arrayOf};
