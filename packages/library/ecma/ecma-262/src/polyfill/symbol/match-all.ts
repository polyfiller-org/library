import {SUPPORTS_SYMBOL_MATCH_ALL} from "../../support/symbol/match-all";
import {patchSymbolMatchAll} from "../../patch/symbol/match-all";

if (!SUPPORTS_SYMBOL_MATCH_ALL) {
	patchSymbolMatchAll();
}
