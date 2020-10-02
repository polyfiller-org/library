import {GlobalThisValue} from "../../environment/global-this-value";

const globalThisValue = GlobalThisValue();

export const NATIVE_SYMBOL_TO_STRING_TAG = globalThisValue.Symbol?.toStringTag;
export const NATIVE_SYMBOL_ITERATOR = globalThisValue.Symbol?.iterator;
export const NATIVE_SYMBOL_ASYNC_ITERATOR = globalThisValue.Symbol?.asyncIterator;
export const NATIVE_SYMBOL_TO_PRIMITIVE = globalThisValue.Symbol?.toPrimitive;
export const NATIVE_SYMBOL_HAS_INSTANCE = globalThisValue.Symbol?.hasInstance;
export const NATIVE_SYMBOL_SPECIES = globalThisValue.Symbol?.species;
export const NATIVE_SYMBOL_MATCH = globalThisValue.Symbol?.match;
export const NATIVE_SYMBOL_MATCH_ALL = globalThisValue.Symbol?.matchAll;
export const NATIVE_SYMBOL_REPLACE = globalThisValue.Symbol?.replace;
export const NATIVE_SYMBOL_SEARCH = globalThisValue.Symbol?.search;
export const NATIVE_SYMBOL_SPLIT = globalThisValue.Symbol?.split;
