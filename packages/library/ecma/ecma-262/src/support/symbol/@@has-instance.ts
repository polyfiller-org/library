import {SUPPORTS_SYMBOL_HAS_INSTANCE} from "./has-instance";

export const SUPPORTS_SYMBOL_SYMBOL_HAS_INSTANCE = SUPPORTS_SYMBOL_HAS_INSTANCE && (Symbol)[Symbol.hasInstance] != null;