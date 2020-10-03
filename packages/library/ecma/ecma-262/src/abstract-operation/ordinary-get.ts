import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {IsDataDescriptor} from "./is-data-descriptor";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {Call} from "./call";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-ordinaryget
 */
export function OrdinaryGet<TO, TP extends keyof TO, TReceiver>(O: TO, P: TP, Receiver?: TReceiver): TO[TP];
export function OrdinaryGet<TO, TP extends PropertyKey, TReceiver>(O: TO, P: TP, Receiver?: TReceiver): TO[keyof TO] | undefined;
export function OrdinaryGet<TO, TP extends PropertyKey | keyof TO, TReceiver>(O: TO, P: TP, Receiver?: TReceiver): TO[keyof TO] | undefined {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 must be a PropertyKey`, TypeError);
	// Let desc be ? O.[[GetOwnProperty]](P).
	const desc = internals(O)["[[GetOwnProperty]]"](P);

	// If desc is undefined, then
	if (desc === undefined) {
		// Let parent be ? O.[[GetPrototypeOf]]().
		const parent = internals(O)["[[GetPrototypeOf]]"]();
		// If parent is null, return undefined.
		if (parent === null) {
			return undefined;
		}

		// Return ? parent.[[Get]](P, Receiver).
		return internals(parent)["[[Get]]"](P, Receiver) as TO[keyof TO];
	}

	// If IsDataDescriptor(desc) is true, return desc.[[Value]].
	if (IsDataDescriptor(desc)) {
		return desc["[[Value]]"];
	}

	// Assert: IsAccessorDescriptor(desc) is true.
	assert(IsAccessorDescriptor(desc));

	// Let getter be desc.[[Get]].
	const getter = desc["[[Get]]"];

	// If getter is undefined, return undefined.
	if (getter === undefined) {
		return undefined;
	}

	// Return ? Call(getter, Receiver).
	return Call(getter, Receiver);
}
