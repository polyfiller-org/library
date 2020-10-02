import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_UNSCOPABLES = SUPPORTS_SYMBOL && "unscopables" in Symbol;
