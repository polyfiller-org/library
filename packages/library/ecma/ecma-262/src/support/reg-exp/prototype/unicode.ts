import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_UNICODE = SUPPORTS_REG_EXP && "unicode" in RegExp.prototype;
