import {internals} from "../../lib/internal-slot-map/internals";
import {HasOwnProperty} from "../../abstract-operation/has-own-property";
import {Get} from "../../abstract-operation/get";
import {assert} from "../../abstract-operation/assert";
import {OrdinaryGet} from "../../abstract-operation/ordinary-get";

/**
 * https://tc39.es/ecma262/#sec-arguments-exotic-objects-get-p-receiver
 * @param {PropertyKey} P
 * @param {Receiver} Receiver
 * @private
 */
export function __ArgumentsGet__<Receiver>(this: IArguments, P: PropertyKey, Receiver: Receiver) {
	// Let args be the arguments object.
	const args = this;

	// Let map be args.[[ParameterMap]].
	const map = internals(args)["[[ParameterMap]]"];

	// Let isMapped be ! HasOwnProperty(map, P).
	const isMapped = HasOwnProperty(map, P);

	// If isMapped is false, then
	if (isMapped === false) {
		// Return ? OrdinaryGet(args, P, Receiver).
		return OrdinaryGet(args, P, Receiver);
	}

	// Else,
	else {
		// Assert: map contains a formal parameter mapping for P.
		assert(P in map);

		// Return Get(map, P).
		return Get(map, P);
	}
}
