import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_FOR_EACH = SUPPORTS_MAP && "forEach" in Map.prototype;
