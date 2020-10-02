import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_ITERATOR = SUPPORTS_SYMBOL && "iterator" in Symbol;