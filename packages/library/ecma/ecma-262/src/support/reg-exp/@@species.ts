import {SUPPORTS_SYMBOL_SPECIES} from "../symbol/species";
import {SUPPORTS_REG_EXP} from "./constructor";

export const SUPPORTS_REG_EXP_SYMBOL_SPECIES = SUPPORTS_SYMBOL_SPECIES && SUPPORTS_REG_EXP && RegExp[Symbol.species] != null;
