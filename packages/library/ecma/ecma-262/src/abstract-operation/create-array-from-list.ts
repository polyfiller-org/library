import {List, List2, List3} from "../lib/list/list";
import {IsList} from "../lib/list/is-list";
import {ToString} from "./to-string";
import {CreateDataProperty} from "./create-data-property";
import {ArrayCreate} from "./array-create";
import {assert} from "./assert";

/**
 * The abstract operation CreateArrayFromList is used to create an Array object whose elements are provided by a List.
 * https://tc39.github.io/ecma262/#sec-createarrayfromlist
 */
export function CreateArrayFromList<T, U, Z>(elements: List3<T, U, Z>): [T, U, Z];
export function CreateArrayFromList<T, U>(elements: List2<T, U>): [T, U];
export function CreateArrayFromList<T>(elements: List<T>): T[];
export function CreateArrayFromList<T>(elements: List<T>): T[] {
	// Assert: elements is a List whose elements are all ECMAScript language values.
	assert(IsList(elements), `Invalid input: argument on position 0 must be a list of valid EcmaScript language values`, TypeError);

	// Let array be ! ArrayCreate(0).
	const array = ArrayCreate<T>(0);
	// Let n be 0.
	let n = 0;
	// For each element e of elements, do
	for (let i = 0; i < elements.length; i++) {
		const e = elements.get(i);

		// Let status be CreateDataProperty(array, ! ToString(n), e).
		const status = CreateDataProperty(array, ToString(n), e);

		// Assert: status is true.
		assert(status === true, `Expected status to be true`, TypeError);

		// Increment n by 1.
		n++;
	}
	// Return array.
	return array;
}
