import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_ENTRIES = SUPPORTS_MAP && "entries" in Map.prototype;
