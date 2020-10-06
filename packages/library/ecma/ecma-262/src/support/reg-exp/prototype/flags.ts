import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_FLAGS = SUPPORTS_REG_EXP && "flags" in RegExp.prototype;
