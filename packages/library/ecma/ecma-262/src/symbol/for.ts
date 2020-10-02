import {ToString} from "../abstract-operation/to-string";
import {SameValue} from "../abstract-operation/same-value";
import {GlobalSymbolRegistry} from "./global-symbol-registry";

/**
 * https://tc39.es/ecma262/#sec-symbol.for
 */
export const {for: symbolFor} = {
	for(key: unknown): symbol {
		// Let stringKey be ? ToString(key).
		const stringKey = ToString(key);

		// For each element e of the GlobalSymbolRegistry List, do
		const length = GlobalSymbolRegistry.length;

		for (let i = 0; i < length; i++) {
			const e = GlobalSymbolRegistry.get(i);

			// If SameValue(e.[[Key]], stringKey) is true, return e.[[Symbol]].
			if (SameValue(e["[[Key]]"], stringKey) === true) {
				return e["[[Symbol]]"];
			}
		}

		// Assert: GlobalSymbolRegistry does not currently contain an entry for stringKey.
		// Let newSymbol be a new unique Symbol value whose [[Description]] value is stringKey.
		const newSymbol = Symbol(stringKey);

		// Append the Record { [[Key]]: stringKey, [[Symbol]]: newSymbol } to the GlobalSymbolRegistry List.
		GlobalSymbolRegistry.append({"[[Key]]": stringKey, "[[Symbol]]": newSymbol});

		// Return newSymbol.
		return newSymbol;
	}
};
