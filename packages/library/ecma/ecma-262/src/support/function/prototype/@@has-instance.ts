import {SUPPORTS_SYMBOL_HAS_INSTANCE} from "../../symbol/has-instance";

export const SUPPORTS_FUNCTION_PROTOTYPE_SYMBOL_HAS_INSTANCE = SUPPORTS_SYMBOL_HAS_INSTANCE && Function.prototype[Symbol.hasInstance] != null;
