import {Realm} from "../environment/realm/realm";
import {ObjectCreate} from "../abstract-operation/object-create";
import {errorFormatArgument} from "../util/error-format-argument";
import {internals} from "../lib/internal-slot-map/internals";
import {CreateIterResultObject} from "../abstract-operation/create-iter-result-object";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../symbol/native/native";
import {assertType} from "../abstract-operation/assert";
import {RegExpExec} from "../abstract-operation/reg-exp-exec";
import {ToString} from "../abstract-operation/to-string";
import {Get} from "../abstract-operation/get";
import {ToLength} from "../abstract-operation/to-length";
import {AdvanceStringIndex} from "../abstract-operation/advance-string-index";
import {Set} from "../abstract-operation/set";

export interface RegExpStringIteratorPrototype {
	next(value: string): IteratorResult<RegExpMatchArray>;
}

/**
 * https://tc39.es/ecma262/#sec-%regexpstringiteratorprototype%-object
 */
export function $RegExpStringIteratorPrototype$(realm: Realm): RegExpStringIteratorPrototype {
	const proto = ObjectCreate(realm["[[Intrinsics]]"]["[[%IteratorPrototype%]]"]) as RegExpStringIteratorPrototype;

	proto.next = function(this: RegExpStringIteratorPrototype): IteratorResult<RegExpMatchArray> {
		// Let O be the this value.
		const O = this;
		// If Type(O) is not Object, throw a TypeError exception.
		assertType(O, "Object", `Method RegExp String Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`, TypeError);

		const internalSlots = internals(O);

		// If O does not have all of the internal slots of a RegExp String Iterator Object Instance (see 21.2.7.2), throw a TypeError exception.
		if (
			!("[[IteratingRegExp]]" in internalSlots) ||
			!("[[IteratedString]]" in internalSlots) ||
			!("[[Global]]" in internalSlots) ||
			!("[[Unicode]]" in internalSlots) ||
			!("[[Done]]" in internalSlots)
		) {
			throw new TypeError(`Method RegExp String Iterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`);
		}

		// If O.[[Done]] is true, then
		if (internalSlots["[[Done]]"] === true) {
			// Return ! CreateIterResultObject(undefined, true).
			return CreateIterResultObject<RegExpMatchArray>(undefined, true);
		}

		// Let R be O.[[IteratingRegExp]].
		const R = internalSlots["[[IteratingRegExp]]"];

		// Let S be O.[[IteratedString]].
		const S = internalSlots["[[IteratedString]]"];

		// Let global be O.[[Global]].
		const global = internalSlots["[[Global]]"];

		// Let fullUnicode be O.[[Unicode]].
		const fullUnicode = internalSlots["[[Unicode]]"];

		// Let match be ? RegExpExec(R, S).
		const match = RegExpExec(R!, S!);

		// If match is null, then
		if (match == null) {
			// Set O.[[Done]] to true.
			internalSlots["[[Done]]"] = true;

			// Return ! CreateIterResultObject(undefined, true).
			return CreateIterResultObject<RegExpMatchArray>(undefined, true);
		}

		// Else,
		else {
			// If global is true, then
			if (global === true) {
				// Let matchStr be ? ToString(? Get(match, "0")).
				const matchStr = ToString(Get(match, "0"));

				// If matchStr is the empty String, then
				if (matchStr === "") {
					// Let thisIndex be ? ToLength(? Get(R, "lastIndex")).
					const thisIndex = ToLength(Get(R, "lastIndex"));

					// Let nextIndex be ! AdvanceStringIndex(S, thisIndex, fullUnicode).
					const nextIndex = AdvanceStringIndex(S!, thisIndex, fullUnicode);

					// Perform ? Set(R, "lastIndex", nextIndex, true).
					Set(R, "lastIndex", nextIndex, true);
				}

				// Return ! CreateIterResultObject(match, false).
				return CreateIterResultObject<RegExpMatchArray>(match, false);
			}

			// Else,
			else {
				// Set O.[[Done]] to true.
				internalSlots["[[Done]]"] = true;

				// Return ! CreateIterResultObject(match, false).
				return CreateIterResultObject<RegExpMatchArray>(match, false);
			}
		}
	};

	// https://tc39.es/ecma262/#sec-%regexpstringiteratorprototype%-@@tostringtag
	OrdinaryDefineOwnProperty(proto, Symbol.toStringTag, {
		"[[Value]]": "RegExp String Iterator",
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@toStringTag
	if (NATIVE_SYMBOL_TO_STRING_TAG != null && NATIVE_SYMBOL_TO_STRING_TAG !== Symbol.toStringTag) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_TO_STRING_TAG, {
			"[[Value]]": "RegExp String Iterator",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
