import {SUPPORTS_SYMBOL} from "../../support/symbol/constructor";
import {patchSymbolConstructor} from "../../patch/symbol/constructor";

if (!SUPPORTS_SYMBOL) {
	patchSymbolConstructor();
}
