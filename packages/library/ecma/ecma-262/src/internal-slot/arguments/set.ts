import {internals} from "../../lib/internal-slot-map/internals";
import {HasOwnProperty} from "../../abstract-operation/has-own-property";
import {Set} from "../../abstract-operation/set";
import {assert} from "../../abstract-operation/assert";
import {SameValue} from "../../abstract-operation/same-value";
import {OrdinarySet} from "../../abstract-operation/ordinary-set";

/**
 * https://tc39.es/ecma262/#sec-arguments-exotic-objects-set-p-v-receiver
 * @param {PropertyKey} P
 * @param {V} V
 * @param {Receiver} Receiver
 * @private
 */
export function __ArgumentsSet__<V, Receiver>(this: IArguments, P: PropertyKey, V: V, Receiver: Receiver) {
	let isMapped: boolean;
	let map: Record<string, unknown> | undefined;

	// Let args be the arguments object.
	const args = this;

	// If SameValue(args, Receiver) is false, then
	if (SameValue(args, Receiver) === false) {
		// Let isMapped be false.
		isMapped = false;
	}

	// Else,
	else {
		// Let map be args.[[ParameterMap]].
		map = internals(args)["[[ParameterMap]]"];

		// Let isMapped be ! HasOwnProperty(map, P).
		isMapped = HasOwnProperty(map, P);
	}

	// If isMapped is true, then
	if (isMapped) {
		// Let setStatus be Set(map, P, V, false).
		const setStatus = Set(map, P, V, false);

		// Assert: setStatus is true because formal parameters mapped by argument objects are always writable.
		assert(setStatus === true);
	}

	// Return ? OrdinarySet(args, P, V, Receiver).
	return OrdinarySet(args, P as keyof typeof args, V, Receiver);
}
