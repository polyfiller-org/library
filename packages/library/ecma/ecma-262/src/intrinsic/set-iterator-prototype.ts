import {Realm} from "../environment/realm/realm";
import {ObjectCreate} from "../abstract-operation/object-create";
import {Type} from "../abstract-operation/type";
import {errorFormatArgument} from "../util/error-format-argument";
import {internals} from "../lib/internal-slot-map/internals";
import {CreateIterResultObject} from "../abstract-operation/create-iter-result-object";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../symbol/native/native";
import {assert} from "../abstract-operation/assert";

export interface SetIteratorPrototype<T> {
	next(value: T): IteratorResult<T>;
}

export function $SetIteratorPrototype$(realm: Realm) {
	// has a [[Prototype]] internal slot whose value is %IteratorPrototype%.
	const proto = ObjectCreate<SetIteratorPrototype<unknown>>(realm["[[Intrinsics]]"]["[[%IteratorPrototype%]]"]);
	proto.next = function <Value>(this: SetIteratorPrototype<Value>) {
		// Let O be the this value.
		const O = this;

		// If Type(O) is not Object, throw a TypeError exception.
		if (Type(O) !== "Object") {
			throw new TypeError(`Method Set Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}

		const internalSlots = internals(O);

		// If O does not have all of the internal slots of a
		// Set Iterator Instance (23.2.5.3), throw a TypeError exception.
		if (
			!("[[IteratedSet]]" in internalSlots) ||
			!("[[IteratedSetMapIterator]]" in internalSlots) ||
			!("[[SetNextIndex]]" in internalSlots) ||
			!("[[SetIterationKind]]" in internalSlots)
		) {
			throw new TypeError(`Method Set Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}

		// Let s be O.[[IteratedSet]].
		const s = internalSlots["[[IteratedSet]]"];

		// If s is undefined, return CreateIterResultObject(undefined, true).
		if (s === undefined) {
			return CreateIterResultObject(undefined, true);
		}

		const sInternalSlots = internals(s);

		// Assert: s has a [[SetData]] internal slot.
		assert("[[SetData]]" in sInternalSlots);

		// Let entries be the List that is s.[[SetData]].
		const iterator = internalSlots["[[IteratedSetMapIterator]]"];
		return iterator!.next();
	};

	// https://tc39.es/ecma262/#sec-%setiteratorprototype%-@@tostringtag
	OrdinaryDefineOwnProperty(proto, Symbol.toStringTag, {
		"[[Value]]": "Set Iterator",
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@toStringTag
	if (NATIVE_SYMBOL_TO_STRING_TAG != null && NATIVE_SYMBOL_TO_STRING_TAG !== Symbol.toStringTag) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_TO_STRING_TAG, {
			"[[Value]]": "Set Iterator",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
