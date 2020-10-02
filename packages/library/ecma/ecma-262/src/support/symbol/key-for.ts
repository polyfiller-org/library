import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_KEY_FOR = SUPPORTS_SYMBOL && "keyFor" in Symbol;
