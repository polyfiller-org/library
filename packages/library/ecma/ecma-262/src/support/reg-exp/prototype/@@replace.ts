import {SUPPORTS_REG_EXP} from "../constructor";
import {SUPPORTS_SYMBOL_REPLACE} from "../../symbol/replace";

export const SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_REPLACE = SUPPORTS_SYMBOL_REPLACE && SUPPORTS_REG_EXP && RegExp.prototype[Symbol.replace] != null;
