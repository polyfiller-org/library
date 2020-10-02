import {SUPPORTS_SYMBOL} from "../constructor";

export const SUPPORTS_SYMBOL_PROTOTYPE_VALUE_OF = SUPPORTS_SYMBOL && Symbol.prototype.hasOwnProperty("valueOf");