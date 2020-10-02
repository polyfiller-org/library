import {InternalAccessorDescriptor, InternalPropertyDescriptor} from "../type/internal-property-descriptor";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-isaccessordescriptor
 * @param {PropertyDescriptor} Desc
 * @returns {Desc is InternalAccessorDescriptor}
 */
export function IsAccessorDescriptor(Desc?: InternalPropertyDescriptor): Desc is InternalAccessorDescriptor {
	// If Desc is undefined, return false.
	if (Desc === undefined) {
		return false;
	}

	// If both Desc.[[Get]] and Desc.[[Set]] are absent, return false.
	if (!("[[Get]]" in Desc) && !("[[Set]]" in Desc)) {
		return false;
	}

	// Return true.
	return true;
}
