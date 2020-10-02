import {SUPPORTS_SYMBOL_SPECIES} from "../../support/symbol/species";
import {patchSymbolSpecies} from "../../patch/symbol/species";

if (!SUPPORTS_SYMBOL_SPECIES) {
	patchSymbolSpecies();
}
