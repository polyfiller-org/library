import {assertType} from "./assert";
import {ObjectCreate} from "./object-create";
import {makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";
import {StringIteratorPrototypeInternals} from "../internal-slot/string-iterator-prototype/string-iterator-prototype-internals";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";

/**
 * Several methods of String objects return Iterator objects.
 * The abstract operation CreateStringIterator with argument string is used to create such iterator objects.
 * https://tc39.es/ecma262/#sec-createstringiterator
 */
export function CreateStringIterator(string: string): IterableIterator<string> {
	// Assert: Type(string) is String.
	assertType(string, "String");

	const intrinsics = getCurrentIntrinsics();

	// Let iterator be ObjectCreate(%StringIteratorPrototype%, « [[IteratedString]], [[StringIteratorNextIndex]] »).
	const iterator = ObjectCreate<IterableIterator<string>>(
		intrinsics["[[%StringIteratorPrototype%]]"],
		makeList("[[IteratedString]]", "[[StringIteratorNextIndex]]")
	);

	const internalSlots = internals(iterator) as StringIteratorPrototypeInternals;

	// Set iterator.[[IteratedString]] to string.
	internalSlots["[[IteratedString]]"] = string;

	// Set iterator.[[StringIteratorNextIndex]] to 0.
	internalSlots["[[StringIteratorNextIndex]]"] = 0;

	// Return iterator.
	return iterator;
}
