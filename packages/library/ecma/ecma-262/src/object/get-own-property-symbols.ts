import {GetOwnPropertyKeys} from "../abstract-operation/get-own-property-keys";
/**
 * https://tc39.es/ecma262/#sec-object.getownpropertysymbols
 */
export const {getOwnPropertySymbols: objectGetOwnPropertySymbols} = {
	getOwnPropertySymbols<O>(O: O) {
		// Return ? GetOwnPropertyKeys(O, Symbol).
		return GetOwnPropertyKeys(O, "Symbol");
	}
};
