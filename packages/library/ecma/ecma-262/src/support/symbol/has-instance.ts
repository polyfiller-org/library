import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_HAS_INSTANCE = SUPPORTS_SYMBOL && "hasInstance" in Symbol;
