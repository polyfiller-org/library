import {SUPPORTS_REG_EXP_PROTOTYPE_TO_STRING} from "../../../support/reg-exp/prototype/to-string";
import {patchRegExpPrototypeToString} from "../../../patch/reg-exp/prototype/to-string";

if (!SUPPORTS_REG_EXP_PROTOTYPE_TO_STRING) {
	patchRegExpPrototypeToString();
}
