import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {IsDataDescriptor} from "./is-data-descriptor";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {Call} from "./call";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-ordinaryget
 * @param {O} O
 * @param {P} P
 * @param {Receiver} Receiver
 * @returns {}
 */
export function OrdinaryGet<O, P extends keyof O, Receiver>(O: O, P: P, Receiver?: Receiver): O[P];
export function OrdinaryGet<O, P extends PropertyKey, Receiver>(O: O, P: P, Receiver?: Receiver): O[keyof O] | undefined;
export function OrdinaryGet<O, P extends PropertyKey | keyof O, Receiver>(O: O, P: P, Receiver?: Receiver): O[keyof O] | undefined {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 must be a PropertyKey`, TypeError);
	// Let desc be ? O.[[GetOwnProperty]](P).
	let desc = internals(O)["[[GetOwnProperty]]"](P);

	// If desc is undefined, then
	if (desc === undefined) {
		// Let parent be ? O.[[GetPrototypeOf]]().
		let parent = internals(O)["[[GetPrototypeOf]]"]();
		// If parent is null, return undefined.
		if (parent === null) {
			return undefined;
		}

		// Return ? parent.[[Get]](P, Receiver).
		return internals(parent)["[[Get]]"](P, Receiver) as O[keyof O];
	}

	// If IsDataDescriptor(desc) is true, return desc.[[Value]].
	if (IsDataDescriptor(desc)) {
		return desc["[[Value]]"];
	}

	// Assert: IsAccessorDescriptor(desc) is true.
	assert(IsAccessorDescriptor(desc));

	// Let getter be desc.[[Get]].
	let getter = desc["[[Get]]"];

	// If getter is undefined, return undefined.
	if (getter === undefined) {
		return undefined;
	}

	// Return ? Call(getter, Receiver).
	return Call(getter, Receiver);
}
