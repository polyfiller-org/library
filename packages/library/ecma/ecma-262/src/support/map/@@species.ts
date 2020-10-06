import {SUPPORTS_SYMBOL_SPECIES} from "../symbol/species";
import {SUPPORTS_MAP} from "./constructor";

export const SUPPORTS_MAP_SYMBOL_SPECIES = SUPPORTS_SYMBOL_SPECIES && SUPPORTS_MAP && Map[Symbol.species] != null;
