import {ObjectDefineProperties} from "../abstract-operation/object-define-properties";

/**
 * https://tc39.es/ecma262/#sec-object.defineproperties
 */
export const {defineProperties: objectDefineProperties} = {
	defineProperties<TO>(O: TO, Properties: PropertyDescriptorMap & ThisType<TO>): TO {
		// Return ? ObjectDefineProperties(O, Properties).
		return ObjectDefineProperties(O, Properties);
	}
};
