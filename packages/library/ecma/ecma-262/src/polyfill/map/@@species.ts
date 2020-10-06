import {SUPPORTS_MAP_SYMBOL_SPECIES} from "../../support/map/@@species";
import {patchMapSymbolSpecies} from "../../patch/map/@@species";

if (!SUPPORTS_MAP_SYMBOL_SPECIES) {
	patchMapSymbolSpecies();
}
