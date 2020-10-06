import {SUPPORTS_REG_EXP} from "../constructor";
import {SUPPORTS_SYMBOL_SEARCH} from "../../symbol/search";

export const SUPPORTS_REG_EXP_PROTOTYPE_SYMBOL_SEARCH = SUPPORTS_SYMBOL_SEARCH && SUPPORTS_REG_EXP && RegExp.prototype[Symbol.search] != null;
