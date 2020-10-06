import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_SPECIES} from "../../symbol/native/native";
import {regExpSymbolSpecies} from "../../reg-exp/@@species";

export function patchRegExpSymbolSpecies(): void {
	// RegExp.@@species
	OrdinaryDefineOwnProperty(RegExp, Symbol.species, {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": regExpSymbolSpecies(),
		"[[Set]]": undefined
	});

	if (NATIVE_SYMBOL_SPECIES !== undefined) {
		// Map.@@species
		OrdinaryDefineOwnProperty(RegExp, NATIVE_SYMBOL_SPECIES, {
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Get]]": regExpSymbolSpecies(),
			"[[Set]]": undefined
		});
	}
}
