import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {IsDataDescriptor} from "../../abstract-operation/is-data-descriptor";
import {SameValue} from "../../abstract-operation/same-value";
import {IsAccessorDescriptor} from "../../abstract-operation/is-accessor-descriptor";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-set-p-v-receiver
 * @private
 */
export function __ProxySet__<T extends {}, Value, Receiver>(this: T, P: PropertyKey, V: Value, Receiver: Receiver) {
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

	// Let trap be ? GetMethod(handler, "set").
	const trap = GetMethod(handler, "set");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[Get]](P, Receiver).
		const targetInternals = internals(target);
		return internals(target)["[[Set]]"](P as keyof typeof targetInternals, V, Receiver);
	}

	// Let booleanTrapResult be ! ToBoolean(? Call(trap, handler, « target, P, V, Receiver »)).
	const booleanTrapResult = ToBoolean(Call(trap, handler, makeList(target, P, V, Receiver)));

	// If booleanTrapResult is false, return false.
	if (booleanTrapResult === false) {
		return false;
	}

	// Let targetDesc be ? target.[[GetOwnProperty]](P).
	const targetDesc = internals(target)["[[GetOwnProperty]]"](P);

	// If targetDesc is not undefined and targetDesc.[[Configurable]] is false, then
	if (targetDesc !== undefined && targetDesc["[[Configurable]]"] === false) {
		// If IsDataDescriptor(targetDesc) is true and targetDesc.[[Writable]] is false, then
		if (IsDataDescriptor(targetDesc) && targetDesc["[[Writable]]"] === false) {
			// If SameValue(V, targetDesc.[[Value]]) is false, throw a TypeError exception.
			if (SameValue(V, targetDesc["[[Value]]"]) === false) {
				throw new TypeError();
			}
		}

		// If IsAccessorDescriptor(targetDesc) is true, then
		if (IsAccessorDescriptor(targetDesc)) {
			// If targetDesc.[[Set]] is undefined, throw a TypeError exception.
			if (targetDesc["[[Set]]"] === undefined) {
				throw new TypeError();
			}
		}
	}

	// Return true.
	return true;
}
