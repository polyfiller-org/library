import {SUPPORTS_SYMBOL_ITERATOR} from "../../symbol/iterator";

export const SUPPORTS_STRING_PROTOTYPE_SYMBOL_ITERATOR = SUPPORTS_SYMBOL_ITERATOR && String.prototype[Symbol.iterator] != null;
