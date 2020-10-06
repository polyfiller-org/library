import {SUPPORTS_REG_EXP_PROTOTYPE_SOURCE} from "../../../support/reg-exp/prototype/source";
import {patchRegExpPrototypeSource} from "../../../patch/reg-exp/prototype/source";

if (!SUPPORTS_REG_EXP_PROTOTYPE_SOURCE) {
	patchRegExpPrototypeSource();
}
