import {SUPPORTS_SYMBOL} from "../constructor";
import {safeHasOwnProperty} from "../../../util/safe-has-own-property";

export const SUPPORTS_SYMBOL_PROTOTYPE_VALUE_OF = SUPPORTS_SYMBOL && safeHasOwnProperty(Symbol.prototype, "valueOf");
