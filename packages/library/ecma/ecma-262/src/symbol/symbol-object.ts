import {setInternals} from "../lib/internal-slot-map/internals";
import {ObjectCreate} from "../abstract-operation/object-create";
import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-properties-of-symbol-instances
 */
export function SymbolObject(symbol: symbol): Symbol {
	const symbolObject = ObjectCreate<Symbol>(Symbol.prototype, makeList("[[SymbolData]]"));
	setInternals(symbolObject, "symbol-object", {
		"[[SymbolData]]": symbol
	});

	return symbolObject;
}
