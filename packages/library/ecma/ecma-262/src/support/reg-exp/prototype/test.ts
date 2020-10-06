import {SUPPORTS_REG_EXP} from "../constructor";

export const SUPPORTS_REG_EXP_PROTOTYPE_TEST = SUPPORTS_REG_EXP && "test" in RegExp.prototype;
