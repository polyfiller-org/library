import {SUPPORTS_SYMBOL_TO_STRING_TAG} from "../to-string-tag";

export const SUPPORTS_SYMBOL_PROTOTYPE_SYMBOL_TO_STRING_TAG = SUPPORTS_SYMBOL_TO_STRING_TAG && (Symbol.prototype as any)[Symbol.toStringTag] != null;