import {ObjectDefineProperties} from "../abstract-operation/object-define-properties";

/**
 * https://tc39.es/ecma262/#sec-object.defineproperties
 */
export const {defineProperties: objectDefineProperties} = {
	defineProperties<O>(O: O, Properties: PropertyDescriptorMap & ThisType<O>): O {
		// Return ? ObjectDefineProperties(O, Properties).
		return ObjectDefineProperties(O, Properties);
	}
};
