import {SUPPORTS_REG_EXP_PROTOTYPE_FLAGS} from "../../../support/reg-exp/prototype/flags";
import {patchRegExpPrototypeFlags} from "../../../patch/reg-exp/prototype/flags";

if (!SUPPORTS_REG_EXP_PROTOTYPE_FLAGS) {
	patchRegExpPrototypeFlags();
}
