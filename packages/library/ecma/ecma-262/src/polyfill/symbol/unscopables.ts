import {SUPPORTS_SYMBOL_UNSCOPABLES} from "../../support/symbol/unscopables";
import {patchSymbolUnscopables} from "../../patch/symbol/unscopables";

if (!SUPPORTS_SYMBOL_UNSCOPABLES) {
	patchSymbolUnscopables();
}
