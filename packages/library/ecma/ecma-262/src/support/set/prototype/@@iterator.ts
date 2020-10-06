import {SUPPORTS_SET} from "../constructor";
import {SUPPORTS_SYMBOL_ITERATOR} from "../../symbol/iterator";

export const SUPPORTS_SET_PROTOTYPE_SYMBOL_ITERATOR = SUPPORTS_SYMBOL_ITERATOR && SUPPORTS_SET && Set.prototype[Symbol.iterator] != null;
