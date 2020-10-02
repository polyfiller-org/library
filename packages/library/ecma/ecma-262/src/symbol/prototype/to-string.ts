import {thisSymbolValue} from "../../abstract-operation/this-symbol-value";
import {SymbolDescriptiveString} from "../../abstract-operation/symbol-descriptive-string";

/**
 * https://tc39.es/ecma262/#sec-symbol.prototype.tostring
 */
export const {toString: symbolPrototypeToString} = {
	toString(this: symbol) {
		// Let sym be ? thisSymbolValue(this value).
		const sym = thisSymbolValue(this);

		// Return SymbolDescriptiveString(sym).
		return SymbolDescriptiveString(sym);
	}
};
