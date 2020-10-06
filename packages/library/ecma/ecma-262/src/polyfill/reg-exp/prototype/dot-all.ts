import {SUPPORTS_REG_EXP_PROTOTYPE_DOT_ALL} from "../../../support/reg-exp/prototype/dot-all";
import {patchRegExpPrototypeDotAll} from "../../../patch/reg-exp/prototype/dot-all";

if (!SUPPORTS_REG_EXP_PROTOTYPE_DOT_ALL) {
	patchRegExpPrototypeDotAll();
}
