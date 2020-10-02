import {SUPPORTS_SYMBOL_ITERATOR} from "../../symbol/iterator";

export const SUPPORTS_ARRAY_PROTOTYPE_SYMBOL_ITERATOR = SUPPORTS_SYMBOL_ITERATOR && Array.prototype[Symbol.iterator] != null;
