import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_IGNORE_CASE = SUPPORTS_REG_EXP && "ignoreCase" in RegExp.prototype;
