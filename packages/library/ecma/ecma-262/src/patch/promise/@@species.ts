import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {arraySymbolSpecies} from "../../array/@@species";
import {NATIVE_SYMBOL_SPECIES} from "../../symbol/native/native";
import {promiseSymbolSpecies} from "../../promise/@@species";

export function patchPromiseSymbolSpecies(): void {
	// Promise.@@species
	OrdinaryDefineOwnProperty(Promise, Symbol.species, {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": promiseSymbolSpecies(),
		"[[Set]]": undefined
	});

	if (NATIVE_SYMBOL_SPECIES !== undefined) {
		// Map.prototype.@@iterator
		OrdinaryDefineOwnProperty(Promise, NATIVE_SYMBOL_SPECIES, {
			"[[Get]]": arraySymbolSpecies(),
			"[[Set]]": undefined
		});
	}
}
