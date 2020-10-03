import {internals} from "../lib/internal-slot-map/internals";

export const symbolSymbolHasInstance = function (this: symbol) {
	return "[[SymbolData]]" in internals(this);
};
