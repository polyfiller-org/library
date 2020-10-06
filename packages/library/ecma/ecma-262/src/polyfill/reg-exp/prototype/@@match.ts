import {SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_MATCH} from "../../../support/reg-exp/prototype/@@match";
import {patchRegExpPrototypeSymbolMatch} from "../../../patch/reg-exp/prototype/@@match";

if (!SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_MATCH) {
	patchRegExpPrototypeSymbolMatch();
}
