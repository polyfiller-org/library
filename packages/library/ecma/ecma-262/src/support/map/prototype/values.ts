import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_VALUES = SUPPORTS_MAP && "values" in Map.prototype;
