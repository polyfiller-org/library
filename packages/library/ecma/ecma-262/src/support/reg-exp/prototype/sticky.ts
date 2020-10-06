import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_STICKY = SUPPORTS_REG_EXP && "sticky" in RegExp.prototype;
