import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_GLOBAL = SUPPORTS_REG_EXP && "global" in RegExp.prototype;
