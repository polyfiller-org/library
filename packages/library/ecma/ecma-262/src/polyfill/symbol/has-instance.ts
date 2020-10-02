import {SUPPORTS_SYMBOL_HAS_INSTANCE} from "../../support/symbol/has-instance";
import {patchSymbolHasInstance} from "../../patch/symbol/has-instance";

if (!SUPPORTS_SYMBOL_HAS_INSTANCE) {
	patchSymbolHasInstance();
}
