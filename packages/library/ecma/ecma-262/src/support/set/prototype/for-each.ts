import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_FOR_EACH = SUPPORTS_SET && "forEach" in Set.prototype;
