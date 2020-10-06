import {SUPPORTS_MAP} from "../constructor";
import {SUPPORTS_SYMBOL_TO_STRING_TAG} from "../../symbol/to-string-tag";

export const SUPPORTS_MAP_PROTOTYPE_SYMBOL_TO_STRING_TAG = SUPPORTS_SYMBOL_TO_STRING_TAG && SUPPORTS_MAP && Map.prototype[Symbol.toStringTag] != null;
