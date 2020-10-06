import {SUPPORTS_REG_EXP_PROTOTYPE_EXEC} from "../../../support/reg-exp/prototype/exec";
import {patchRegExpPrototypeExec} from "../../../patch/reg-exp/prototype/exec";

if (!SUPPORTS_REG_EXP_PROTOTYPE_EXEC) {
	patchRegExpPrototypeExec();
}
