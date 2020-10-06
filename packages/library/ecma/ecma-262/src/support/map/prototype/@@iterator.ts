import {SUPPORTS_MAP} from "../constructor";
import {SUPPORTS_SYMBOL_ITERATOR} from "../../symbol/iterator";

export const SUPPORTS_MAP_PROTOTYPE_SYMBOL_ITERATOR = SUPPORTS_SYMBOL_ITERATOR && SUPPORTS_MAP && Map.prototype[Symbol.iterator] != null;
