import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_TO_STRING_TAG = SUPPORTS_SYMBOL && "toStringTag" in Symbol;
