import {SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_REPLACE} from "../../../support/reg-exp/prototype/@@replace";
import {patchRegExpPrototypeSymbolReplace} from "../../../patch/reg-exp/prototype/@@replace";

if (!SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_REPLACE) {
	patchRegExpPrototypeSymbolReplace();
}
