import {ToString} from "../abstract-operation/to-string";
import {makeList} from "../lib/list/list";
import {ObjectCreate} from "../abstract-operation/object-create";
import {internals, setInternals} from "../lib/internal-slot-map/internals";

export const SYMBOL_LIST = makeList<symbol>();

/**
 * https://tc39.es/ecma262/#sec-symbol-description
 */
export const {Symbol: SymbolConstructor} = {
	Symbol(): symbol {
		const descriptionPresent = arguments.length >= 1;
		const description = !descriptionPresent ? undefined : arguments[0];
		const NewTarget = this;
		let descString: string | undefined;

		// If NewTarget is not undefined, throw a TypeError exception.
		if (NewTarget !== undefined) {
			throw new TypeError(`Symbol is not a constructor`);
		}

		// If description is undefined, let descString be undefined.
		if (description === undefined) {
			descString = undefined;
		}

		// Else, let descString be ? ToString(description).
		else {
			descString = ToString(description);
		}

		// Return a new unique Symbol value whose [[Description]] value is descString.
		const symbol = ObjectCreate<symbol>(Symbol.prototype, makeList("[[Description]]"));
		setInternals(symbol, "symbol", {
			"[[Description]]": descString
		});

		// Add the Symbol to the list of all created symbols
		SYMBOL_LIST.append(symbol);

		// Symbols behave like primitive values, and as such are frozen.
		internals(symbol)["[[PreventExtensions]]"]();

		return symbol;
	}
};
