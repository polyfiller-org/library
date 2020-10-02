import {ObjectCreate} from "../abstract-operation/object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {internals} from "../lib/internal-slot-map/internals";
import {ToObject} from "../abstract-operation/to-object";
import {FromPropertyDescriptor} from "../abstract-operation/from-property-descriptor";
import {CreateDataProperty} from "../abstract-operation/create-data-property";

/**
 * https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
 */
export const {getOwnPropertyDescriptors: objectGetOwnPropertyDescriptors} = {
	getOwnPropertyDescriptors<O>(O: O) {
		// Let obj be ? ToObject(O).
		const obj = ToObject(O);

		// Let ownKeys be ? obj.[[OwnPropertyKeys]]().
		const ownKeys = internals(obj)["[[OwnPropertyKeys]]"]();

		// Let descriptors be ! ObjectCreate(%Object.prototype%).
		const descriptors = ObjectCreate<Object>(getCurrentIntrinsics()["[[%ObjectPrototype%]]"]);

		// For each element key of ownKeys in List order, do
		for (let i = 0; i < ownKeys.length; i++) {
			const key = ownKeys.get(i);

			// Let desc be ? obj.[[GetOwnProperty]](key).
			const desc = internals(obj)["[[GetOwnProperty]]"](key);

			// Let descriptor be ! FromPropertyDescriptor(desc).
			const descriptor = FromPropertyDescriptor(desc);

			// If descriptor is not undefined, perform ! CreateDataProperty(descriptors, key, descriptor).
			if (descriptor !== undefined) {
				CreateDataProperty(descriptors, key, descriptor);
			}
		}

		// Return descriptors.
		return descriptors;
	}
};
