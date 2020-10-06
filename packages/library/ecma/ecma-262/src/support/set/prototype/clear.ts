import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_CLEAR = SUPPORTS_SET && "clear" in Set.prototype;
