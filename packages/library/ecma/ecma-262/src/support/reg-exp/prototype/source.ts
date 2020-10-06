import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_SOURCE = SUPPORTS_REG_EXP && "source" in RegExp.prototype;
