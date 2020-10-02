import {internals} from "../../lib/internal-slot-map/internals";
import {HasOwnProperty} from "../../abstract-operation/has-own-property";
import {Get} from "../../abstract-operation/get";
import {Set} from "../../abstract-operation/set";
import {InternalPropertyDescriptor} from "../../type/internal-property-descriptor";
import {IsDataDescriptor} from "../../abstract-operation/is-data-descriptor";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {IsAccessorDescriptor} from "../../abstract-operation/is-accessor-descriptor";
import {assert} from "../../abstract-operation/assert";

/**
 * https://tc39.es/ecma262/#sec-arguments-exotic-objects-defineownproperty-p-desc
 * @param {PropertyKey} P
 * @param {InternalPropertyDescriptor} Desc
 * @private
 */
export function __ArgumentsDefineOwnProperty__(this: IArguments, P: PropertyKey, Desc: InternalPropertyDescriptor) {
	// Let args be the arguments object.
	const args = this;

	// Let map be args.[[ParameterMap]].
	const map = internals(args)["[[ParameterMap]]"];

	// Let isMapped be HasOwnProperty(map, P).
	const isMapped = HasOwnProperty(map, P);

	// Let newArgDesc be Desc.
	let newArgDesc = Desc;

	// If isMapped is true and IsDataDescriptor(Desc) is true, then
	if (isMapped === true && IsDataDescriptor(Desc) === true) {
		// If Desc.[[Value]] is not present and Desc.[[Writable]] is present and its value is false, then
		if (!("[[Value]]" in Desc) && "[[Writable]]" in Desc && Desc["[[Writable]]"] === false) {
			// Set newArgDesc to a copy of Desc.
			newArgDesc = {...Desc};

			// Set newArgDesc.[[Value]] to Get(map, P).
			newArgDesc["[[Value]]"] = Get(map, P);
		}
	}

	// Let allowed be ? OrdinaryDefineOwnProperty(args, P, newArgDesc).
	const allowed = OrdinaryDefineOwnProperty(args, P, newArgDesc);

	// If allowed is false, return false.
	if (allowed === false) return false;

	// If isMapped is true, then
	if (isMapped === true) {
		// If IsAccessorDescriptor(Desc) is true, then
		if (IsAccessorDescriptor(Desc) === true) {
			// Call map.[[Delete]](P).
			internals(map)["[[Delete]]"](P);
		}

		// Else,
		else {
			// If Desc.[[Value]] is present, then
			if ("[[Value]]" in Desc) {
				// Let setStatus be Set(map, P, Desc.[[Value]], false).
				const setStatus = Set(map, P as keyof typeof map, Desc["[[Value]]"], false);

				// Assert: setStatus is true because formal parameters mapped by argument objects are always writable.
				assert(setStatus === true);
			}

			// If Desc.[[Writable]] is present and its value is false, then
			if ("[[Writable]]" in Desc && Desc["[[Writable]]"] === false) {
				// Call map.[[Delete]](P).
				internals(map)["[[Delete]]"](P);
			}
		}
	}

	// Return true.
	return true;
}
