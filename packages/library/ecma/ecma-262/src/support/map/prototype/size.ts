import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_SIZE = SUPPORTS_MAP && "size" in Map.prototype;
