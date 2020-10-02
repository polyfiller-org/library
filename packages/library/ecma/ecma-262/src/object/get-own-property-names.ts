import {GetOwnPropertyKeys} from "../abstract-operation/get-own-property-keys";
/**
 * https://tc39.es/ecma262/#sec-object.getownpropertynames
 */
export const {getOwnPropertyNames: objectGetOwnPropertyNames} = {
	getOwnPropertyNames<O>(O: O) {
		// Return ? GetOwnPropertyKeys(O, String).
		return GetOwnPropertyKeys(O, "String");
	}
};
