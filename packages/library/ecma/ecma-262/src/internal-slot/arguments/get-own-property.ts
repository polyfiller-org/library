import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {internals} from "../../lib/internal-slot-map/internals";
import {HasOwnProperty} from "../../abstract-operation/has-own-property";
import {Get} from "../../abstract-operation/get";

/**
 * https://tc39.es/ecma262/#sec-arguments-exotic-objects-getownproperty-p
 * @param {PropertyKey} P
 * @private
 */
export function __ArgumentsGetOwnProperty__(this: IArguments, P: PropertyKey) {
	// Let args be the arguments object.
	const args = this;

	// Let desc be OrdinaryGetOwnProperty(args, P).
	const desc = OrdinaryGetOwnProperty(args, P);

	// If desc is undefined, return desc.
	if (desc === undefined) return desc;

	// Let map be args.[[ParameterMap]].
	const map = internals(args)["[[ParameterMap]]"];

	// Let isMapped be ! HasOwnProperty(map, P).
	const isMapped = HasOwnProperty(map, P);

	// If isMapped is true, then
	if (isMapped === true) {
		// Set desc.[[Value]] to Get(map, P).
		desc["[[Value]]"] = Get(map, P);
	}

	// Return desc.
	return desc;
}
