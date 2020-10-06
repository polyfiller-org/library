import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_KEYS = SUPPORTS_SET && "keys" in Set.prototype;
