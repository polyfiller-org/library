import {SUPPORTS_REG_EXP_PROTOTYPE_TEST} from "../../../support/reg-exp/prototype/test";
import {patchRegExpPrototypeTest} from "../../../patch/reg-exp/prototype/test";

if (!SUPPORTS_REG_EXP_PROTOTYPE_TEST) {
	patchRegExpPrototypeTest();
}
