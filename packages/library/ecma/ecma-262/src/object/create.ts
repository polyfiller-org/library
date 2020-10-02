import {Type} from "../abstract-operation/type";
import {errorFormatArgument} from "../util/error-format-argument";
import {ObjectCreate} from "../abstract-operation/object-create";
import {ObjectDefineProperties} from "../abstract-operation/object-define-properties";

/**
 * https://tc39.es/ecma262/#sec-object.create
 */
export const {create: objectCreate} = {
	create<T>(O: object | null, Properties: PropertyDescriptorMap & ThisType<any>): T {
		// If Type(O) is neither Object nor Null, throw a TypeError exception.
		if (Type(O) !== "Object" && Type(O) !== "Null") {
			throw new TypeError(`Object prototype may only be an Object or null: ${errorFormatArgument(O)}`);
		}

		// Let obj be ObjectCreate(O).
		const obj = ObjectCreate<T>(O);

		// If Properties is not undefined, then
		if (Properties !== undefined) {
			// Return ? ObjectDefineProperties(obj, Properties).
			return ObjectDefineProperties(obj, Properties);
		}

		// Return obj.
		return obj;
	}
};
