import {InternalDataDescriptor, InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {IsGenericDescriptor} from "./is-generic-descriptor";
import {IsDataDescriptor} from "./is-data-descriptor";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";

export function IsPropertyDescriptor(Desc?: InternalPropertyDescriptor): Desc is InternalDataDescriptor {
	// If Desc is undefined, return false.
	if (Desc === undefined) {
		return false;
	}

	return IsGenericDescriptor(Desc) || IsDataDescriptor(Desc) || IsAccessorDescriptor(Desc);
}
