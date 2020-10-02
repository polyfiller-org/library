import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {OrdinarySetWithOwnDescriptor} from "./ordinary-set-with-own-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-ordinaryset
 * @param {O} O
 * @param {P} P
 * @param {V} V
 * @param {Receiver} Receiver
 * @returns {O is O&{ [Key in P]: V }}
 */
export function OrdinarySet<O, P extends keyof O, V extends O[P], Receiver>(O: O, P: P, V: V, Receiver: Receiver): O is O & {[Key in P]: V} {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 must be a PropertyKey`, TypeError);

	// Let ownDesc be ? O.[[GetOwnProperty]](P).
	const ownDesc = internals(O)["[[GetOwnProperty]]"](P);

	// Return OrdinarySetWithOwnDescriptor(O, P, V, Receiver, ownDesc).
	return OrdinarySetWithOwnDescriptor(O, P, V, Receiver, ownDesc);
}
