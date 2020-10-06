import {SUPPORTS_REG_EXP_PROTOTYPE_UNICODE} from "../../../support/reg-exp/prototype/unicode";
import {patchRegExpPrototypeUnicode} from "../../../patch/reg-exp/prototype/unicode";

if (!SUPPORTS_REG_EXP_PROTOTYPE_UNICODE) {
	patchRegExpPrototypeUnicode();
}
