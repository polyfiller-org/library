import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {OrdinarySetWithOwnDescriptor} from "./ordinary-set-with-own-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-ordinaryset
 */
export function OrdinarySet<TO, TP extends keyof TO, TV extends TO[TP], TReceiver>(O: TO, P: TP, V: TV, Receiver: TReceiver): O is TO & {[Key in TP]: TV} {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 must be a PropertyKey`, TypeError);

	// Let ownDesc be ? O.[[GetOwnProperty]](P).
	const ownDesc = internals(O)["[[GetOwnProperty]]"](P);

	// Return OrdinarySetWithOwnDescriptor(O, P, V, Receiver, ownDesc).
	return OrdinarySetWithOwnDescriptor(O, P, V, Receiver, ownDesc);
}
