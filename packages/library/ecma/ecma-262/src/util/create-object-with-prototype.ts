const NATIVE_OBJECT_CREATE = Object.create?.toString().indexOf("[native code]") >= 0 ? Object.create : undefined;

/**
 */
export function createObjectWithPrototype<T>(proto: object | null): T {
	let obj: T;

	// Let obj be a newly created object with an internal slot for each name in internalSlotsList.
	// Set obj's essential internal methods to the default ordinary object definitions specified in 9.1.
	if (NATIVE_OBJECT_CREATE != null) {
		obj = NATIVE_OBJECT_CREATE(proto);
	} else if (proto === Object.prototype) {
		obj = Object() as T;
	} else {
		const objCtor = (function () {
			// Empty function
		} as unknown) as new () => T;
		objCtor.prototype = proto;
		obj = new objCtor();
	}

	// Return obj.
	return obj;
}
