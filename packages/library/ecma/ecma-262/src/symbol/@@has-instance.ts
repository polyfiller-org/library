import {internals} from "../lib/internal-slot-map/internals";

export const symbolSymbolHasInstance = function(this: symbol | Symbol) {
	return "[[SymbolData]]" in internals(this);
};
