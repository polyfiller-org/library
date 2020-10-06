import {SUPPORTS_PROMISE_SYMBOL_SPECIES} from "../../support/promise/@@species";
import {patchPromiseSymbolSpecies} from "../../patch/promise/@@species";

if (!SUPPORTS_PROMISE_SYMBOL_SPECIES) {
	patchPromiseSymbolSpecies();
}
