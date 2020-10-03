import {Realm} from "../environment/realm/realm";
import {ObjectCreate} from "../abstract-operation/object-create";
import {Type} from "../abstract-operation/type";
import {errorFormatArgument} from "../util/error-format-argument";
import {internals} from "../lib/internal-slot-map/internals";
import {CreateIterResultObject} from "../abstract-operation/create-iter-result-object";
import {assert} from "../abstract-operation/assert";
import {CreateArrayFromList} from "../abstract-operation/create-array-from-list";
import {makeList} from "../lib/list/list";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {getMapIndexes} from "../util/get-map-indexes";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../symbol/native/native";
import {safeHasOwnProperty} from "../util/safe-has-own-property";

export interface MapIteratorPrototype<Key = unknown, Value = unknown> {
	next(value: [Key, Value]): IteratorResult<Key | Value | [Key, Value]>;
}

/**
 * https://tc39.es/ecma262/#sec-%mapiteratorprototype%-object
 */
export function $MapIteratorPrototype$(realm: Realm) {
	// has a [[Prototype]] internal slot whose value is %IteratorPrototype%.
	const proto = ObjectCreate<MapIteratorPrototype>(realm["[[Intrinsics]]"]["[[%IteratorPrototype%]]"]);
	proto.next = function <Key, Value>(this: MapIteratorPrototype<Key, Value>) {
		let result: Key | Value | [Key, Value];
		// Let O be the this value.
		const O = this;

		// If Type(O) is not Object, throw a TypeError exception.
		if (Type(O) !== "Object") {
			throw new TypeError(`Method Map Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}

		const internalSlots = internals(O);

		// If O does not have all of the internal slots of an Map Iterator Instance
		// (22.1.5.3), throw a TypeError exception.
		if (!("[[Map]]" in internalSlots) || !("[[MapNextIndex]]" in internalSlots) || !("[[MapIterationKind]]" in internalSlots)) {
			throw new TypeError(`Method Map Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}

		// Let m be O.[[Map]].
		const m = internalSlots["[[Map]]"];

		// Let index be O.[[MapNextIndex]].
		let index = internalSlots["[[MapNextIndex]]"];

		// Let itemKind be O.[[MapIterationKind]].
		const itemKind = internalSlots["[[MapIterationKind]]"];

		// If m is undefined, return CreateIterResultObject(undefined, true).
		if (m === undefined) {
			return CreateIterResultObject(undefined, true);
		}

		const mInternalSlots = internals(m);

		// Assert: m has a [[MapData]] internal slot.
		assert("[[MapData]]" in mInternalSlots);

		// Let entries be the List that is m.[[MapData]].
		const entries = mInternalSlots["[[MapData]]"];
		const keys = mInternalSlots["[[MapKeys]]"];

		while (index < keys.length) {
			// Let e be the Record { [[Key]], [[Value]] } that is the value of entries[index].
			const key = safeHasOwnProperty(keys, index) ? keys.get(index) : undefined;

			// Set index to index + 1.
			index = index + 1;

			// Set O.[[MapNextIndex]] to index.
			internalSlots["[[MapNextIndex]]"] = index;

			if (key != null) {
				const {mapDataIndex, entryIndex} = getMapIndexes(key["[[Key]]"], entries);

				if (entryIndex != null) {
					const e = entries.get(mapDataIndex).get(entryIndex);

					// If itemKind is "key", let result be e.[[Key]].
					if (itemKind === "key") {
						result = e["[[Key]]"];
					}

					// Else if itemKind is "value", let result be e.[[Value]].
					else if (itemKind === "value") {
						result = e["[[Value]]"];
					}

					// Else,
					else {
						// Assert: itemKind is "key+value".
						assert(itemKind === "key+value");

						// Let result be ! CreateArrayFromList(« e.[[Key]], e.[[Value]] »).
						result = CreateArrayFromList(makeList(e["[[Key]]"], e["[[Value]]"]));
					}

					// Return CreateIterResultObject(result, false).
					return CreateIterResultObject(result, false);
				}
			}
		}

		// Set O.[[Map]] to undefined.
		internalSlots["[[Map]]"] = undefined;

		// Return CreateIterResultObject(undefined, true).
		return CreateIterResultObject(undefined, true);
	};

	// https://tc39.es/ecma262/#sec-%mapiteratorprototype%-@@tostringtag
	OrdinaryDefineOwnProperty(proto, Symbol.toStringTag, {
		"[[Value]]": "Map Iterator",
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@toStringTag
	if (NATIVE_SYMBOL_TO_STRING_TAG != null && NATIVE_SYMBOL_TO_STRING_TAG !== Symbol.toStringTag) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_TO_STRING_TAG, {
			"[[Value]]": "Map Iterator",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
