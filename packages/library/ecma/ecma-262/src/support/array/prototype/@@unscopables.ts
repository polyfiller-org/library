import {SUPPORTS_SYMBOL_UNSCOPABLES} from "../../symbol/unscopables";

export const SUPPORTS_ARRAY_PROTOTYPE_SYMBOL_UNSCOPABLES = SUPPORTS_SYMBOL_UNSCOPABLES && Array.prototype[Symbol.unscopables] != null;
