import {SUPPORTS_SET} from "../constructor";

export const SUPPORTS_SET_PROTOTYPE_VALUES = SUPPORTS_SET && "values" in Set.prototype;
