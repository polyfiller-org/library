import {SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_SEARCH} from "../../../support/reg-exp/prototype/@@search";
import {patchRegExpPrototypeSymbolSearch} from "../../../patch/reg-exp/prototype/@@search";

if (!SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_SEARCH) {
	patchRegExpPrototypeSymbolSearch();
}
