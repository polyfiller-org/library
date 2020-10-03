import {ValidateAndApplyPropertyDescriptor} from "./validate-and-apply-property-descriptor";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";

/**
 * https://tc39.es/ecma262/#sec-iscompatiblepropertydescriptor
 */
export function IsCompatiblePropertyDescriptor<TDesc extends InternalPropertyDescriptor>(
	Extensible: boolean,
	Desc: TDesc,
	Current: InternalPropertyDescriptor | undefined
): boolean {
	// Return ValidateAndApplyPropertyDescriptor(undefined, undefined, Extensible, Desc, Current).
	return ValidateAndApplyPropertyDescriptor(undefined, undefined, Extensible, Desc, Current);
}
