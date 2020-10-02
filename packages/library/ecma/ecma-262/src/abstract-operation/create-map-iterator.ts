import {ObjectCreate} from "./object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";
import {IteratorKind} from "../type/iterator-kind";
import {RequireInternalSlot} from "./require-internal-slot";
import {MapIteratorPrototypeInternals} from "../internal-slot/map-iterator-prototype/map-iterator-prototype-internals";

/**
 * Several methods of Map objects return Iterator objects.
 * The abstract operation CreateMapIterator with arguments map and kind is used to create such iterator objects.
 * https://tc39.es/ecma262/#sec-createmapiterator
 */
export function CreateMapIterator<Key, Value>(map: Map<Key, Value>, kind: "key"): IterableIterator<Key>;
export function CreateMapIterator<Key, Value>(map: Map<Key, Value>, kind: "value"): IterableIterator<Value>;
export function CreateMapIterator<Key, Value>(map: Map<Key, Value>, kind: "key+value"): IterableIterator<[Key, Value]>;
export function CreateMapIterator<Key, Value>(map: Map<Key, Value>, kind: IteratorKind): IterableIterator<Key | Value | [Key, Value]> {
	// Perform ? RequireInternalSlot(map, [[MapData]]).
	RequireInternalSlot(map, "[[MapData]]");

	const intrinsics = getCurrentIntrinsics();

	// Let iterator be ObjectCreate(%MapIteratorPrototype%, « [[Map]], [[MapNextIndex]], [[MapIterationKind]] »).
	const iterator = ObjectCreate<IterableIterator<[Key, Value]>>(
		intrinsics["[[%MapIteratorPrototype%]]"],
		makeList("[[Map]]", "[[MapNextIndex]]", "[[MapIterationKind]]")
	);

	const internalSlots = internals(iterator) as MapIteratorPrototypeInternals<Key, Value>;

	// Set iterator.[[Map]] to map.
	internalSlots["[[Map]]"] = map;

	// Set iterator.[[MapNextIndex]] to 0.
	internalSlots["[[MapNextIndex]]"] = 0;

	// Set iterator.[[MapIterationKind]] to kind.
	internalSlots["[[MapIterationKind]]"] = kind;

	// Return iterator.
	return iterator;
}
