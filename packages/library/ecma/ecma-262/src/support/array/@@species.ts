import {SUPPORTS_SYMBOL_SPECIES} from "../symbol/species";

export const SUPPORTS_ARRAY_SYMBOL_SPECIES = SUPPORTS_SYMBOL_SPECIES && Array[Symbol.species] != null;
