import {SUPPORTS_REG_EXP} from "../constructor";
import {safeHasOwnProperty} from "../../../util/safe-has-own-property";

export const SUPPORTS_REG_EXP_PROTOTYPE_TO_STRING = SUPPORTS_REG_EXP && safeHasOwnProperty(RegExp.prototype, "toString");
