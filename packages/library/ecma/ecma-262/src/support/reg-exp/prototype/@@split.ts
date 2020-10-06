import {SUPPORTS_REG_EXP} from "../constructor";
import {SUPPORTS_SYMBOL_SPLIT} from "../../symbol/split";

export const SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_SPLIT = SUPPORTS_SYMBOL_SPLIT && SUPPORTS_REG_EXP && RegExp.prototype[Symbol.split] != null;
