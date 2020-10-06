import {SUPPORTS_REG_EXP_PROTOTYPE_IGNORE_CASE} from "../../../support/reg-exp/prototype/ignore-case";
import {patchRegExpPrototypeIgnoreCase} from "../../../patch/reg-exp/prototype/ignore-case";

if (!SUPPORTS_REG_EXP_PROTOTYPE_IGNORE_CASE) {
	patchRegExpPrototypeIgnoreCase();
}
