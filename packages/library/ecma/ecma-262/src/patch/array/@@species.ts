import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {arraySymbolSpecies} from "../../array/@@species";
import {NATIVE_SYMBOL_SPECIES} from "../../symbol/native/native";

export function patchArraySymbolSpecies(): void {

	// Array.@@species
	OrdinaryDefineOwnProperty(Array, Symbol.species, {
		"[[Get]]": arraySymbolSpecies(),
		"[[Set]]": undefined
	});

	if (NATIVE_SYMBOL_SPECIES !== undefined) {
		// Map.prototype.@@iterator
		OrdinaryDefineOwnProperty(Array, NATIVE_SYMBOL_SPECIES, {
			"[[Get]]": arraySymbolSpecies(),
			"[[Set]]": undefined
		});
	}
}
