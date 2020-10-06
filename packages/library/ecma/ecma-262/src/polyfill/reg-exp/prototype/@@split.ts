import {SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_SPLIT} from "../../../support/reg-exp/prototype/@@split";
import {patchRegExpPrototypeSymbolSplit} from "../../../patch/reg-exp/prototype/@@split";

if (!SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_SPLIT) {
	patchRegExpPrototypeSymbolSplit();
}
