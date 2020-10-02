import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_REPLACE = SUPPORTS_SYMBOL && "replace" in Symbol;
