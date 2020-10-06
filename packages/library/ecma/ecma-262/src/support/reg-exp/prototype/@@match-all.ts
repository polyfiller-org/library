import {SUPPORTS_REG_EXP} from "../constructor";
import {SUPPORTS_SYMBOL_MATCH_ALL} from "../../symbol/match-all";

export const SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_MATCH_ALL = SUPPORTS_SYMBOL_MATCH_ALL && SUPPORTS_REG_EXP && RegExp.prototype[Symbol.matchAll] != null;
