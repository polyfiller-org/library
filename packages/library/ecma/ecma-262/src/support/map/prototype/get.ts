import {SUPPORTS_MAP} from "../constructor";

export const SUPPORTS_MAP_PROTOTYPE_GET = SUPPORTS_MAP && "get" in Map.prototype;
