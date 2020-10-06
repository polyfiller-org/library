import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolSpecies} from "../../symbol/species";

export function patchSymbolSpecies(): void {
	// Symbol.species
	OrdinaryDefineOwnProperty(Symbol, "species", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolSpecies()
	});
}
