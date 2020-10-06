import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_EXEC = SUPPORTS_REG_EXP && "exec" in RegExp.prototype;
