import {assertType} from "./assert";
import {errorFormatArgument} from "../util/error-format-argument";
import {ObjectCreate} from "./object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";
import {IteratorKind} from "../type/iterator-kind";
import {ArrayIteratorPrototypeInternals} from "../internal-slot/array-iterator-prototype/array-iterator-prototype-internals";

/**
 * Several methods of Array objects return Iterator objects.
 * The abstract operation CreateArrayIterator with arguments array and kind is used to create such iterator objects.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-createarrayiterator
 */
export function CreateArrayIterator<T>(array: T[], kind: "key"): IterableIterator<number>;
export function CreateArrayIterator<T>(array: T[], kind: "value"): IterableIterator<T>;
export function CreateArrayIterator<T>(array: T[], kind: "key+value"): IterableIterator<[number, T]>;
export function CreateArrayIterator<T>(array: T[], kind: IteratorKind): IterableIterator<number | T | [number, T]> {
	// Assert: Type(array) is Object.
	assertType(array, "Object", `Argument on position 0 ${errorFormatArgument(array)} must be an Object`, TypeError);

	const intrinsics = getCurrentIntrinsics();
	// Let iterator be ObjectCreate(%ArrayIteratorPrototype%, « [[IteratedObject]], [[ArrayIteratorNextIndex]], [[ArrayIterationKind]] »).
	const iterator = ObjectCreate<IterableIterator<[number, T]>>(
		intrinsics["[[%ArrayIteratorPrototype%]]"],
		makeList("[[IteratedObject]]", "[[ArrayIteratorNextIndex]]", "[[ArrayIterationKind]]")
	);

	const internalSlots = internals(iterator) as ArrayIteratorPrototypeInternals<T>;

	// Set iterator.[[IteratedObject]] to array.
	internalSlots["[[IteratedObject]]"] = array;

	// Set iterator.[[ArrayIteratorNextIndex]] to 0.
	internalSlots["[[ArrayIteratorNextIndex]]"] = 0;

	// Set iterator.[[ArrayIterationKind]] to kind.
	internalSlots["[[ArrayIterationKind]]"] = kind;

	// Return iterator.
	return iterator;
}
