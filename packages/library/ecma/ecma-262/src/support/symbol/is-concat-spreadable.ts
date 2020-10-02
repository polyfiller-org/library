import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_IS_CONCAT_SPREADABLE = SUPPORTS_SYMBOL && "isConcatSpreadable" in Symbol;
