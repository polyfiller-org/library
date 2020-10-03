import {ObjectCreate} from "../abstract-operation/object-create";
import {Type} from "../abstract-operation/type";
import {errorFormatArgument} from "../util/error-format-argument";
import {CreateIterResultObject} from "../abstract-operation/create-iter-result-object";
import {IsDetachedBuffer} from "../abstract-operation/is-detached-buffer";
import {ToLength} from "../abstract-operation/to-length";
import {Get} from "../abstract-operation/get";
import {ToString} from "../abstract-operation/to-string";
import {assert} from "../abstract-operation/assert";
import {CreateArrayFromList} from "../abstract-operation/create-array-from-list";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {Realm} from "../environment/realm/realm";
import {makeList} from "../lib/list/list";
import {Internals, internals} from "../lib/internal-slot-map/internals";
import {isTypedArrayInternals} from "../internal-slot/typed-array/typed-array-internals";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../symbol/native/native";
import {ProxyInternals} from "../internal-slot/proxy/proxy-internals";
import {ArrayIteratorPrototypeInternals} from "../internal-slot/array-iterator-prototype/array-iterator-prototype-internals";

export interface ArrayIteratorPrototype<T = unknown> {
	next(value: T): IteratorResult<T>;
}

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-%arrayiteratorprototype%-object
 */
export function $ArrayIteratorPrototype$(realm: Realm): ArrayIteratorPrototype {
	const proto = ObjectCreate<ArrayIteratorPrototype>(realm["[[Intrinsics]]"]["[[%IteratorPrototype%]]"]);
	proto.next = function <T>(this: ArrayIteratorPrototype<T>) {
		let len: number;
		let result: T | number | [number, T | number];

		// Let O be the this value.
		const O = this;

		// If Type(O) is not Object, throw a TypeError exception.
		if (Type(O) !== "Object") {
			throw new TypeError(`Method Array Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}

		const internalSlots = (internals(O) as unknown) as Internals<ProxyInternals & ArrayIteratorPrototypeInternals<T>>;

		// If O does not have all of the internal slots of an Array Iterator Instance
		// (22.1.5.3), throw a TypeError exception.
		if (!("[[IteratedObject]]" in internalSlots) || !("[[ArrayIteratorNextIndex]]" in internalSlots) || !("[[ArrayIterationKind]]" in internalSlots)) {
			throw new TypeError(`Method Array Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}

		// Let a be O.[[IteratedObject]].
		const a = internalSlots["[[IteratedObject]]"];

		// If a is undefined, return CreateIterResultObject(undefined, true).
		if (a === undefined) {
			return CreateIterResultObject(undefined, true);
		}

		// Let index be O.[[ArrayIteratorNextIndex]].
		const index = internalSlots["[[ArrayIteratorNextIndex]]"];

		// Let itemKind be O.[[ArrayIterationKind]].
		const itemKind = internalSlots["[[ArrayIterationKind]]"];

		const aInternalSlots = internals(a);

		// If a has a [[TypedArrayName]] internal slot, then
		if ("[[TypedArrayName]]" in aInternalSlots && isTypedArrayInternals(aInternalSlots)) {
			// If IsDetachedBuffer(a.[[ViewedArrayBuffer]]) is true, throw a TypeError exception.
			if (IsDetachedBuffer(aInternalSlots["[[ViewedArrayBuffer]]"])) {
				throw new TypeError();
			}
			// Let len be a.[[ArrayLength]].
			len = aInternalSlots["[[ArrayLength]]"];
		}

		// Else,
		else {
			// Let len be ? ToLength(? Get(a, "length")).
			len = ToLength(Get(a, "length"));
		}

		// If index ≥ len, then
		if (index >= len) {
			// Set O.[[IteratedObject]] to undefined.
			internalSlots["[[IteratedObject]]"] = undefined;

			// Return CreateIterResultObject(undefined, true).
			return CreateIterResultObject(undefined, true);
		}

		// Set O.[[ArrayIteratorNextIndex]] to index + 1.
		internalSlots["[[ArrayIteratorNextIndex]]"] = index + 1;

		// If itemKind is "key", return CreateIterResultObject(index, false).
		if (itemKind === "key") {
			return CreateIterResultObject(index, false);
		}

		// Let elementKey be ! ToString(index).
		const elementKey = ToString(index);

		// Let elementValue be ? Get(a, elementKey).
		const elementValue = Get(a, elementKey) as number;

		// If itemKind is "value", let result be elementValue.
		if (itemKind === "value") {
			result = elementValue;
		}

		// Else,
		else {
			// Assert: itemKind is "key+value".
			assert(itemKind === "key+value");

			// Let result be CreateArrayFromList(« index, elementValue »).
			result = CreateArrayFromList(makeList(index, elementValue));
		}

		// Return CreateIterResultObject(result, false).
		return CreateIterResultObject(result, false);
	};

	// http://www.ecma-international.org/ecma-262/10.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag
	OrdinaryDefineOwnProperty(proto, Symbol.toStringTag, {
		"[[Value]]": "Array Iterator",
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@toStringTag
	if (NATIVE_SYMBOL_TO_STRING_TAG != null && NATIVE_SYMBOL_TO_STRING_TAG !== Symbol.toStringTag) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_TO_STRING_TAG, {
			"[[Value]]": "Array Iterator",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
