import {SUPPORTS_SYMBOL} from "../constructor";

export const SUPPORTS_SYMBOL_PROTOTYPE_TO_STRING = SUPPORTS_SYMBOL && Symbol.prototype.hasOwnProperty("toString");