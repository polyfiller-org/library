import {SUPPORTS_REG_EXP_PROTOTYPE_MULTILINE} from "../../../support/reg-exp/prototype/multiline";
import {patchRegExpPrototypeMultiline} from "../../../patch/reg-exp/prototype/multiline";

if (!SUPPORTS_REG_EXP_PROTOTYPE_MULTILINE) {
	patchRegExpPrototypeMultiline();
}
