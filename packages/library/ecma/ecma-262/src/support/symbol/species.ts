import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_SPECIES = SUPPORTS_SYMBOL && "species" in Symbol;