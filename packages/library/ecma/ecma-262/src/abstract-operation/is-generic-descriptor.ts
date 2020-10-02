import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {IsDataDescriptor} from "./is-data-descriptor";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-isgenericdescriptor
 * @param {PropertyDescriptor} Desc
 * @returns {boolean}
 */
export function IsGenericDescriptor(Desc?: InternalPropertyDescriptor): boolean {
	// If Desc is undefined, return false.
	if (Desc === undefined) {
		return false;
	}

	// If IsAccessorDescriptor(Desc) and IsDataDescriptor(Desc) are both false, return true.
	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	// Return false.
	return false;
}
