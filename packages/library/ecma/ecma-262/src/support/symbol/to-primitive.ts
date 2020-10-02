import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_TO_PRIMITIVE = SUPPORTS_SYMBOL && "toPrimitive" in Symbol;
