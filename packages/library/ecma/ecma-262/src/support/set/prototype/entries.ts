import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_ENTRIES = SUPPORTS_SET && "entries" in Set.prototype;
