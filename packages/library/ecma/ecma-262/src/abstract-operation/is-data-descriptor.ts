import {InternalDataDescriptor, InternalPropertyDescriptor} from "../type/internal-property-descriptor";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-isdatadescriptor
 */
export function IsDataDescriptor(Desc?: InternalPropertyDescriptor): Desc is InternalDataDescriptor {
	// If Desc is undefined, return false.
	if (Desc === undefined) {
		return false;
	}

	// If both Desc.[[Value]] and Desc.[[Writable]] are absent, return false.
	if (!("[[Value]]" in Desc) && !("[[Writable]]" in Desc)) {
		return false;
	}

	// Return true.
	return true;
}
