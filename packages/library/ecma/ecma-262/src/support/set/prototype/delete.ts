import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_DELETE = SUPPORTS_SET && "delete" in Set.prototype;
