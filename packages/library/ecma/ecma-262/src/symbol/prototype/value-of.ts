import {thisSymbolValue} from "../../abstract-operation/this-symbol-value";

/**
 * https://tc39.es/ecma262/#sec-symbol.prototype.valueof
 */
export const {valueOf: symbolPrototypeValueOf} = {
	valueOf(this: symbol) {
		// Return ? thisSymbolValue(this value).
		return thisSymbolValue(this);
	}
};
