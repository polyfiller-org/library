import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinarydelete
 */
export function OrdinaryDelete<TO, TP extends PropertyKey>(O: TO, P: TP): boolean {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 must be a PropertyKey`, TypeError);
	// Let desc be ? O.[[GetOwnProperty]](P).
	const desc = internals(O)["[[GetOwnProperty]]"](P);

	// If desc is undefined, return true.
	if (desc === undefined) return true;

	// If desc.[[Configurable]] is true, then
	if (desc["[[Configurable]]"] === true) {
		// Remove the own property with name P from O.
		delete O[(P as unknown) as keyof TO];

		// Return true.
		return true;
	}

	// Return false.
	return false;
}
