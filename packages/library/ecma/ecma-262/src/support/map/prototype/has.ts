import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_HAS = SUPPORTS_MAP && "has" in Map.prototype;
