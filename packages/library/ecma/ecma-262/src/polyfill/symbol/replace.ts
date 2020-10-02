import {SUPPORTS_SYMBOL_REPLACE} from "../../support/symbol/replace";
import {patchSymbolReplace} from "../../patch/symbol/replace";

if (!SUPPORTS_SYMBOL_REPLACE) {
	patchSymbolReplace();
}
