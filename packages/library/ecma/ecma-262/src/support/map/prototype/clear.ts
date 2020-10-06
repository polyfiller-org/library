import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_CLEAR = SUPPORTS_MAP && "clear" in Map.prototype;
