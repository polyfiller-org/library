import {SameValue} from "../abstract-operation/same-value";
import {GlobalSymbolRegistry} from "./global-symbol-registry";
import {Type} from "../abstract-operation/type";
import {errorFormatArgument} from "../util/error-format-argument";

/**
 * https://tc39.es/ecma262/#sec-symbol.keyfor
 */
export const {keyFor: symbolKeyFor} = {
	keyFor(sym: symbol): string | undefined {
		// If Type(sym) is not Symbol, throw a TypeError exception.
		if (Type(sym) !== "Symbol") {
			throw new TypeError(`${errorFormatArgument(sym)} is not a symbol`);
		}

		// For each element e of the GlobalSymbolRegistry List (see 19.4.2.2), do
		const length = GlobalSymbolRegistry.length;
		for (let i = 0; i < length; i++) {
			const e = GlobalSymbolRegistry.get(i);

			// If SameValue(e.[[Symbol]], sym) is true, return e.[[Key]].
			if (SameValue(e["[[Symbol]]"], sym) === true) {
				return e["[[Key]]"];
			}
		}

		// Assert: GlobalSymbolRegistry does not currently contain an entry for sym.
		// Return undefined.
		return undefined;
	}
};
