import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_ADD = SUPPORTS_SET && "add" in Set.prototype;
