import {assertType} from "./assert";
import {makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";
import {OrdinaryObjectCreate} from "./ordinary-object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {RegExpStringIteratorPrototypeInternals} from "../internal-slot/reg-exp-string-iterator-prototype/reg-exp-string-iterator-prototype-internals";

/**
 * https://tc39.es/ecma262/#sec-createregexpstringiterator
 */
export function CreateRegExpStringIterator(R: RegExp, S: string, global: boolean, fullUnicode: boolean): IterableIterator<RegExpMatchArray> {
	// Assert: Type(S) is String.
	assertType(S, "String");

	// Assert: Type(global) is Boolean.
	assertType(global, "Boolean");

	// Assert: Type(fullUnicode) is Boolean.
	assertType(fullUnicode, "Boolean");

	const intrinsics = getCurrentIntrinsics();

	// Let iterator be OrdinaryObjectCreate(%RegExpStringIteratorPrototype%, « [[IteratingRegExp]], [[IteratedString]], [[Global]], [[Unicode]], [[Done]] »).
	const iterator = OrdinaryObjectCreate<IterableIterator<RegExpMatchArray>>(
		intrinsics["[[%RegExpStringIteratorPrototype%]]"],
		makeList("[[IteratingRegExp]]", "[[IteratedString]]", "[[Global]]", "[[Unicode]]", "[[Unicode]]", "[[Done]]")
	);

	const internalSlots = internals(iterator) as RegExpStringIteratorPrototypeInternals;

	// Set iterator.[[IteratingRegExp]] to R.
	internalSlots["[[IteratingRegExp]]"] = R;

	// Set iterator.[[IteratedString]] to S.
	internalSlots["[[IteratedString]]"] = S;

	// Set iterator.[[Global]] to global.
	internalSlots["[[Global]]"] = global;

	// Set iterator.[[Unicode]] to fullUnicode.
	internalSlots["[[Unicode]]"] = fullUnicode;

	// Set iterator.[[Done]] to false.
	internalSlots["[[Done]]"] = false;

	// Return iterator.
	return iterator;
}
