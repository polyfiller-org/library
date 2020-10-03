import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {IsDataDescriptor} from "../../abstract-operation/is-data-descriptor";
import {SameValue} from "../../abstract-operation/same-value";
import {IsAccessorDescriptor} from "../../abstract-operation/is-accessor-descriptor";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
 * @private
 */
export function __ProxyGet__<T extends {}, TReceiver>(this: T, P: PropertyKey, Receiver: TReceiver) {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 0 must be a PropertyKey`, TypeError);

	// Let handler be O.[[ProxyHandler]].
	const handler = internals(this)["[[ProxyHandler]]"];

	// If handler is null, throw a TypeError exception.
	if (handler === null) {
		throw new TypeError();
	}

	// Assert: Type(handler) is Object.
	assertType(handler, "Object");

	// Let target be O.[[ProxyTarget]].
	const target = internals(this)["[[ProxyTarget]]"]!;

	// Let trap be ? GetMethod(handler, "get").
	const trap = GetMethod(handler, "get");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[Get]](P, Receiver).
		return internals(target)["[[Get]]"](P, Receiver);
	}

	// Let trapResult be ? Call(trap, handler, « target, P, Receiver »).
	const trapResult = Call(trap, handler, makeList(target, P, Receiver));

	// Let targetDesc be ? target.[[GetOwnProperty]](P).
	const targetDesc = internals(target)["[[GetOwnProperty]]"](P);

	// If targetDesc is not undefined and targetDesc.[[Configurable]] is false, then
	if (targetDesc !== undefined && targetDesc["[[Configurable]]"] === false) {
		// If IsDataDescriptor(targetDesc) is true and targetDesc.[[Writable]] is false, then
		if (IsDataDescriptor(targetDesc) && targetDesc["[[Writable]]"] === false) {
			// If SameValue(trapResult, targetDesc.[[Value]]) is false, throw a TypeError exception.
			if (SameValue(trapResult, targetDesc["[[Value]]"]) === false) {
				throw new TypeError();
			}
		}

		// If IsAccessorDescriptor(targetDesc) is true and targetDesc.[[Get]] is undefined, then
		if (IsAccessorDescriptor(targetDesc) && targetDesc["[[Get]]"] === undefined) {
			// If trapResult is not undefined, throw a TypeError exception.
			if (trapResult !== undefined) {
				throw new TypeError();
			}
		}
	}

	// Return trapResult.
	return trapResult;
}
