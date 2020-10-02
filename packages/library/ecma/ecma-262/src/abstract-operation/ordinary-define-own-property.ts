import {IsExtensible} from "./is-extensible";
import {ValidateAndApplyPropertyDescriptor} from "./validate-and-apply-property-descriptor";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinarydefineownproperty
 * @param {O} O
 * @param {P} P
 * @param {Desc} Desc
 * @returns {boolean}
 */
export function OrdinaryDefineOwnProperty<O extends {}, P extends PropertyKey, Desc extends InternalPropertyDescriptor>(
	O: O,
	P: P,
	Desc: Desc
): boolean {
	// Let current be ? O.[[GetOwnProperty]](P).
	let current = internals(O)["[[GetOwnProperty]]"](P);
	// Let extensible be ? IsExtensible(O).
	let extensible = IsExtensible(O);

	// Return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current).
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
}
