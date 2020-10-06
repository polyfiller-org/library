import {SUPPORTS_SET} from "../constructor";
import {SUPPORTS_SYMBOL_TO_STRING_TAG} from "../../symbol/to-string-tag";

export const SUPPORTS_SET_PROTOTYPE_SYMBOL_TO_STRING_TAG = SUPPORTS_SYMBOL_TO_STRING_TAG && SUPPORTS_SET && Set.prototype[Symbol.toStringTag] != null;
