import {IsExtensible} from "./is-extensible";
import {ValidateAndApplyPropertyDescriptor} from "./validate-and-apply-property-descriptor";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinarydefineownproperty
 */
export function OrdinaryDefineOwnProperty<TO extends {}, TP extends PropertyKey, TDesc extends InternalPropertyDescriptor>(O: TO, P: TP, Desc: TDesc): boolean {
	// Let current be ? O.[[GetOwnProperty]](P).
	const current = internals(O)["[[GetOwnProperty]]"](P);
	// Let extensible be ? IsExtensible(O).
	const extensible = IsExtensible(O);

	// Return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current).
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
}
