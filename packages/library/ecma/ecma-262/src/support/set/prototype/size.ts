import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_SIZE = SUPPORTS_SET && "size" in Set.prototype;
