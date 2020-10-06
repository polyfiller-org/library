import {SUPPORTS_REG_EXP_PROTOTYPE_GLOBAL} from "../../../support/reg-exp/prototype/global";
import {patchRegExpPrototypeGlobal} from "../../../patch/reg-exp/prototype/global";

if (!SUPPORTS_REG_EXP_PROTOTYPE_GLOBAL) {
	patchRegExpPrototypeGlobal();
}
