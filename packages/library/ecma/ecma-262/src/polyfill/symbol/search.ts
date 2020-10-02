import {SUPPORTS_SYMBOL_SEARCH} from "../../support/symbol/search";
import {patchSymbolSearch} from "../../patch/symbol/search";

if (!SUPPORTS_SYMBOL_SEARCH) {
	patchSymbolSearch();
}
