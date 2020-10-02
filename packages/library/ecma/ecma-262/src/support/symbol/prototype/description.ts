import {SUPPORTS_SYMBOL} from "../constructor";

export const SUPPORTS_SYMBOL_PROTOTYPE_DESCRIPTION = SUPPORTS_SYMBOL && "description" in Symbol.prototype;
