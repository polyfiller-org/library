import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_DELETE = SUPPORTS_MAP && "delete" in Map.prototype;
