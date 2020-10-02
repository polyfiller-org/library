import {ValidateAndApplyPropertyDescriptor} from "./validate-and-apply-property-descriptor";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";

/**
 * https://tc39.es/ecma262/#sec-iscompatiblepropertydescriptor
 * @param {boolean} Extensible
 * @param {Desc} Desc
 * @param {InternalPropertyDescriptor?} Current
 * @returns {boolean}
 */
export function IsCompatiblePropertyDescriptor<Desc extends InternalPropertyDescriptor>(Extensible: boolean, Desc: Desc, Current: InternalPropertyDescriptor | undefined): boolean {
	// Return ValidateAndApplyPropertyDescriptor(undefined, undefined, Extensible, Desc, Current).
	return ValidateAndApplyPropertyDescriptor(undefined, undefined, Extensible, Desc, Current);
}
