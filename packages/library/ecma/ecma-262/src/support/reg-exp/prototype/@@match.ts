import {SUPPORTS_REG_EXP} from "../constructor";
import {SUPPORTS_SYMBOL_MATCH} from "../../symbol/match";

export const SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_MATCH = SUPPORTS_SYMBOL_MATCH && SUPPORTS_REG_EXP && RegExp.prototype[Symbol.match] != null;
