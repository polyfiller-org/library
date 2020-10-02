import {SUPPORTS_SYMBOL_PROTOTYPE_TO_STRING} from "../../../support/symbol/prototype/to-string";
import {patchSymbolPrototypeToString} from "../../../patch/symbol/prototype/to-string";

if (!SUPPORTS_SYMBOL_PROTOTYPE_TO_STRING) {
	patchSymbolPrototypeToString();
}
