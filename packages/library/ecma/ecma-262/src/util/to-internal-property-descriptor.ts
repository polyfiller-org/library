import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";

export function toInternalPropertyDescriptor(propertyDescriptor: PropertyDescriptor): InternalPropertyDescriptor;
export function toInternalPropertyDescriptor(propertyDescriptor: PropertyDescriptor | undefined): InternalPropertyDescriptor | undefined;
export function toInternalPropertyDescriptor(propertyDescriptor: PropertyDescriptor | undefined): InternalPropertyDescriptor | undefined {
	return propertyDescriptor == null
		? undefined
		: ({
				...("value" in propertyDescriptor
					? {
							"[[Value]]": propertyDescriptor.value
					  }
					: {}),
				...("get" in propertyDescriptor
					? {
							"[[Get]]": propertyDescriptor.get
					  }
					: {}),
				...("set" in propertyDescriptor
					? {
							"[[Set]]": propertyDescriptor.set
					  }
					: {}),
				...("enumerable" in propertyDescriptor
					? {
							"[[Enumerable]]": propertyDescriptor.enumerable
					  }
					: {}),
				...("configurable" in propertyDescriptor
					? {
							"[[Configurable]]": propertyDescriptor.configurable
					  }
					: {}),
				...("writable" in propertyDescriptor
					? {
							"[[Writable]]": propertyDescriptor.writable
					  }
					: {})
		  } as InternalPropertyDescriptor);
}
