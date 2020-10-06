import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_MULTILINE = SUPPORTS_REG_EXP && "multiline" in RegExp.prototype;
