import {SUPPORTS_SYMBOL} from "./constructor";

export const SUPPORTS_SYMBOL_ASYNC_ITERATOR = SUPPORTS_SYMBOL && "asyncIterator" in Symbol;
