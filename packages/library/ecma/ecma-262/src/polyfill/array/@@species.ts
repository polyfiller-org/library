import {SUPPORTS_ARRAY_SYMBOL_SPECIES} from "../../support/array/@@species";
import {patchArraySymbolSpecies} from "../../patch/array/@@species";

if (!SUPPORTS_ARRAY_SYMBOL_SPECIES) {
	patchArraySymbolSpecies();
}
