import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_HAS = SUPPORTS_SET && "has" in Set.prototype;
