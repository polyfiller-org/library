import {SUPPORTS_SYMBOL_SPECIES} from "../symbol/species";
import {SUPPORTS_SET} from "./constructor";

export const SUPPORTS_SET_SYMBOL_SPECIES = SUPPORTS_SYMBOL_SPECIES && SUPPORTS_SET && Set[Symbol.species] != null;
