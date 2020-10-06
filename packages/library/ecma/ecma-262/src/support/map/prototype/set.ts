import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_SET = SUPPORTS_MAP && "set" in Map.prototype;
