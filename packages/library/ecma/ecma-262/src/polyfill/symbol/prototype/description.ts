import {SUPPORTS_SYMBOL_PROTOTYPE_DESCRIPTION} from "../../../support/symbol/prototype/description";
import {patchSymbolPrototypeDescription} from "../../../patch/symbol/prototype/description";

if (!SUPPORTS_SYMBOL_PROTOTYPE_DESCRIPTION) {
	patchSymbolPrototypeDescription();
}
