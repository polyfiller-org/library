import {Type} from "../abstract-operation/type";
import {IsExtensible} from "../abstract-operation/is-extensible";

/**
 * https://tc39.es/ecma262/#sec-object.isextensible
 */
export const {isExtensible: objectIsExtensible} = {
	isExtensible<T>(O: T): boolean {
		// If Type(O) is not Object, return false.
		if (Type(O) !== "Object") return false;

		// Return ? IsExtensible(O).
		return IsExtensible(O);
	}
};
