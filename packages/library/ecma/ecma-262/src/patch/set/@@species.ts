import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_SPECIES} from "../../symbol/native/native";
import {setSymbolSpecies} from "../../set/@@species";

export function patchSetSymbolSpecies(): void {
	// Set.@@species
	OrdinaryDefineOwnProperty(Set, Symbol.species, {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": setSymbolSpecies(),
		"[[Set]]": undefined
	});

	if (NATIVE_SYMBOL_SPECIES !== undefined) {
		// Set.@@species
		OrdinaryDefineOwnProperty(Map, NATIVE_SYMBOL_SPECIES, {
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Get]]": setSymbolSpecies(),
			"[[Set]]": undefined
		});
	}
}
