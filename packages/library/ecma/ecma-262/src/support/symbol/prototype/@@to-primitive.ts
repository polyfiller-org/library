import {SUPPORTS_SYMBOL_TO_PRIMITIVE} from "../to-primitive";

export const SUPPORTS_SYMBOL_PROTOTYPE_SYMBOL_TO_PRIMITIVE = SUPPORTS_SYMBOL_TO_PRIMITIVE && (Symbol.prototype as any)[Symbol.toPrimitive] != null;