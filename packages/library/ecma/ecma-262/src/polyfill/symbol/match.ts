import {SUPPORTS_SYMBOL_MATCH} from "../../support/symbol/match";
import {patchSymbolMatch} from "../../patch/symbol/match";

if (!SUPPORTS_SYMBOL_MATCH) {
	patchSymbolMatch();
}
