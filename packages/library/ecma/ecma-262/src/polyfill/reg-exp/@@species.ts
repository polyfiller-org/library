import {SUPPORTS_REG_EXP_SYMBOL_SPECIES} from "../../support/reg-exp/@@species";
import {patchRegExpSymbolSpecies} from "../../patch/reg-exp/@@species";

if (!SUPPORTS_REG_EXP_SYMBOL_SPECIES) {
	patchRegExpSymbolSpecies();
}
