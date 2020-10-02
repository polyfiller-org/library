import {SUPPORTS_SYMBOL_FOR} from "../../support/symbol/for";
import {patchSymbolFor} from "../../patch/symbol/for";

if (!SUPPORTS_SYMBOL_FOR) {
	patchSymbolFor();
}
