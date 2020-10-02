import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinaryhasproperty
 * @param {O} O
 * @param {PropertyKey} P
 * @returns {boolean}
 */
export function OrdinaryHasProperty<O extends object>(O: O, P: PropertyKey): boolean {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P));

	// Let hasOwn be ? O.[[GetOwnProperty]](P).
	const hasOwn = internals(O)["[[GetOwnProperty]]"](P);

	// If hasOwn is not undefined, return true.
	if (hasOwn !== undefined) {
		return true;
	}

	// Let parent be ? O.[[GetPrototypeOf]]().
	const parent = internals(O)["[[GetPrototypeOf]]"]();

	// If parent is not null, then
	if (parent !== null) {
		// Return ? parent.[[HasProperty]](P).
		return internals(parent)["[[HasProperty]]"](P);
	}

	// Return false.
	return false;
}
