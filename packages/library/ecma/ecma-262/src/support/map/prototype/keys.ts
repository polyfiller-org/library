import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_KEYS = SUPPORTS_MAP && "keys" in Map.prototype;
