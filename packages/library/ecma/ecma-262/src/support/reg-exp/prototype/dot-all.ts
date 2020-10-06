import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_DOT_ALL = SUPPORTS_REG_EXP && "dotAll" in RegExp.prototype;
