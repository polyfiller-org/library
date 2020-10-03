import {internals} from "../../lib/internal-slot-map/internals";
import {HasOwnProperty} from "../../abstract-operation/has-own-property";
import {OrdinaryDelete} from "../../abstract-operation/ordinary-delete";

/**
 * https://tc39.es/ecma262/#sec-arguments-exotic-objects-delete-p
 */
export function __ArgumentsDelete__(this: IArguments, P: PropertyKey) {
	// Let args be the arguments object.
	const args = this;

	// Let map be args.[[ParameterMap]].
	const map = internals(args)["[[ParameterMap]]"];

	// Let isMapped be ! HasOwnProperty(map, P).
	const isMapped = HasOwnProperty(map, P);

	// Let result be ? OrdinaryDelete(args, P).
	const result = OrdinaryDelete(args, P);

	// If result is true and isMapped is true, then
	if (result === true && isMapped === true) {
		// Call map.[[Delete]](P).
		internals(map)["[[Delete]]"](P);
	}

	// Return result.
	return result;
}
