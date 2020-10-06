import {SUPPORTS_REG_EXP_PROTOTYPE_STICKY} from "../../../support/reg-exp/prototype/sticky";
import {patchRegExpPrototypeSticky} from "../../../patch/reg-exp/prototype/sticky";

if (!SUPPORTS_REG_EXP_PROTOTYPE_STICKY) {
	patchRegExpPrototypeSticky();
}
