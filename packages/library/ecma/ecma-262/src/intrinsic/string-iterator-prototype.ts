import {Realm} from "../environment/realm/realm";
import {ObjectCreate} from "../abstract-operation/object-create";
import {errorFormatArgument} from "../util/error-format-argument";
import {internals} from "../lib/internal-slot-map/internals";
import {CreateIterResultObject} from "../abstract-operation/create-iter-result-object";
import {CodePointAt} from "../abstract-operation/code-point-at";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../symbol/native/native";
import {assertType} from "../abstract-operation/assert";

export interface StringIteratorPrototype {
	next(value: string): IteratorResult<string>;
}

/**
 * https://tc39.es/ecma262/#sec-%stringiteratorprototype%-object
 */
export function $StringIteratorPrototype$(realm: Realm): StringIteratorPrototype {
	const proto = ObjectCreate(realm["[[Intrinsics]]"]["[[%IteratorPrototype%]]"]) as StringIteratorPrototype;

	proto.next = function(this: StringIteratorPrototype): IteratorResult<string> {
		// Let O be the this value.
		const O = this;
		// If Type(O) is not Object, throw a TypeError exception.
		assertType(O, "Object", `Method String Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`, TypeError);

		const internalSlots = internals(O);

		// If O does not have all of the internal slots of a String Iterator Instance (21.1.5.3), throw a TypeError exception.
		if (!("[[IteratedString]]" in internalSlots) || !("[[StringIteratorNextIndex]]" in internalSlots)) {
			throw new TypeError(`Method String Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}
		// Let s be O.[[IteratedString]].
		const s = internalSlots["[[IteratedString]]"];

		// If s is undefined, return CreateIterResultObject(undefined, true).
		if (s === undefined) {
			return CreateIterResultObject<string>(undefined, true);
		}

		// Let position be O.[[StringIteratorNextIndex]].
		const position = internalSlots["[[StringIteratorNextIndex]]"];

		// Let len be the length of s.
		const len = s.length;

		// If position ≥ len, then
		if (position >= len) {
			// Set O.[[IteratedString]] to undefined.
			internalSlots["[[IteratedString]]"] = undefined;

			// Return CreateIterResultObject(undefined, true).
			return CreateIterResultObject<string>(undefined, true);
		}

		// Let cp be ! CodePointAt(s, position).
		const cp = CodePointAt(s, position);

		// Let resultString be the String value containing cp.[[CodeUnitCount]]
		// consecutive code units from s beginning with the code unit at index position.
		const resultString = s.charAt(position);

		// Set O.[[StringIteratorNextIndex]] to position + cp.[[CodeUnitCount]].
		internalSlots["[[StringIteratorNextIndex]]"] = position + cp["[[CodeUnitCount]]"];

		// Return CreateIterResultObject(resultString, false).
		return CreateIterResultObject(resultString, false);
	};

	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%-@@tostringtag
	OrdinaryDefineOwnProperty(proto, Symbol.toStringTag, {
		"[[Value]]": "String Iterator",
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@toStringTag
	if (NATIVE_SYMBOL_TO_STRING_TAG != null && NATIVE_SYMBOL_TO_STRING_TAG !== Symbol.toStringTag) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_TO_STRING_TAG, {
			"[[Value]]": "String Iterator",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
