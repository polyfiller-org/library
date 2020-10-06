import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_SPECIES} from "../../symbol/native/native";
import {mapSymbolSpecies} from "../../map/@@species";

export function patchMapSymbolSpecies(): void {
	// Map.@@species
	OrdinaryDefineOwnProperty(Map, Symbol.species, {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": mapSymbolSpecies(),
		"[[Set]]": undefined
	});

	if (NATIVE_SYMBOL_SPECIES !== undefined) {
		// Map.@@species
		OrdinaryDefineOwnProperty(Map, NATIVE_SYMBOL_SPECIES, {
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Get]]": mapSymbolSpecies(),
			"[[Set]]": undefined
		});
	}
}
