import {SUPPORTS_SET_SYMBOL_SPECIES} from "../../support/set/@@species";
import {patchSetSymbolSpecies} from "../../patch/set/@@species";

if (!SUPPORTS_SET_SYMBOL_SPECIES) {
	patchSetSymbolSpecies();
}
