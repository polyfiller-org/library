import {SUPPORTS_SYMBOL_SPLIT} from "../../support/symbol/split";
import {patchSymbolSplit} from "../../patch/symbol/split";

if (!SUPPORTS_SYMBOL_SPLIT) {
	patchSymbolSplit();
}
