import {SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_MATCH_ALL} from "../../../support/reg-exp/prototype/@@match-all";
import {patchRegExpPrototypeSymbolMatchAll} from "../../../patch/reg-exp/prototype/@@match-all";

if (!SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_MATCH_ALL) {
	patchRegExpPrototypeSymbolMatchAll();
}
