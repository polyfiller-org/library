import {ObjectCreate} from "./object-create";
import {makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";
import {IteratorKind} from "../type/iterator-kind";
import {RequireInternalSlot} from "./require-internal-slot";
import {getCurrentRealmRecord} from "../environment/realm/get-current-realm-record";
import {$SetIteratorPrototype$} from "../intrinsic/set-iterator-prototype";
import {SetIteratorPrototypeInternals} from "../internal-slot/set-iterator-prototype/set-iterator-prototype-internals";

/**
 * Several methods of Set objects return Iterator objects.
 * The abstract operation CreateSetIterator with arguments set and kind is used to create such iterator objects.
 * https://tc39.es/ecma262/#sec-createsetiterator
 */
export function CreateSetIterator<Value>(set: Set<Value>, kind: "key"): IterableIterator<Value>;
export function CreateSetIterator<Value>(set: Set<Value>, kind: "value"): IterableIterator<Value>;
export function CreateSetIterator<Value>(set: Set<Value>, kind: "key+value"): IterableIterator<[Value, Value]>;
export function CreateSetIterator<Value>(set: Set<Value>, kind: IteratorKind): IterableIterator<Value | [Value, Value]> {
	// Perform ? RequireInternalSlot(set, [[SetData]]).
	RequireInternalSlot(set, "[[SetData]]");

	// Let iterator be ObjectCreate(%SetIteratorPrototype%, « [[IteratedSet]], [[SetNextIndex]], [[SetIterationKind]] »).
	const iterator = ObjectCreate<IterableIterator<[Value, Value]>>(
		$SetIteratorPrototype$(getCurrentRealmRecord()),
		makeList("[[IteratedSet]]", "[[IteratedSetMapIterator]]", "[[SetNextIndex]]", "[[SetIterationKind]]")
	);

	const iteratorMethodName = kind === "key+value" ? "entries" : "values";

	const internalSlots = internals(iterator) as SetIteratorPrototypeInternals<Value>;

	// Set iterator.[[IteratedSet]] to set.
	internalSlots["[[IteratedSet]]"] = set;
	internalSlots["[[IteratedSetMapIterator]]"] = internals(set)["[[SetData]]"][iteratorMethodName]();

	// Set iterator.[[SetNextIndex]] to 0.
	internalSlots["[[SetNextIndex]]"] = 0;

	// Set iterator.[[SetIterationKind]] to kind.
	internalSlots["[[SetIterationKind]]"] = kind;

	// Return iterator.
	return iterator;
}
