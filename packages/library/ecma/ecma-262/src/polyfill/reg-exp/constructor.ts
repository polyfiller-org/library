import {SUPPORTS_REG_EXP} from "../../support/reg-exp/constructor";
import {patchRegExpConstructor} from "../../patch/reg-exp/constructor";

if (!SUPPORTS_REG_EXP) {
	patchRegExpConstructor();
}
