import {SUPPORTS_SYMBOL_SPECIES} from "../symbol/species";

export const SUPPORTS_PROMISE_SYMBOL_SPECIES = SUPPORTS_SYMBOL_SPECIES && Promise[Symbol.species] != null;
