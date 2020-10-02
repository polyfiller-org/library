import {SUPPORTS_SYMBOL_KEY_FOR} from "../../support/symbol/key-for";
import {patchSymbolKeyFor} from "../../patch/symbol/key-for";

if (!SUPPORTS_SYMBOL_KEY_FOR) {
	patchSymbolKeyFor();
}
