import {SUPPORTS_SYMBOL_PROTOTYPE_SYMBOL_TO_STRING_TAG} from "../../../support/symbol/prototype/@@to-string-tag";
import {patchSymbolPrototypeSymbolToStringTag} from "../../../patch/symbol/prototype/@@to-string-tag";

if (!SUPPORTS_SYMBOL_PROTOTYPE_SYMBOL_TO_STRING_TAG) {
	patchSymbolPrototypeSymbolToStringTag();
}
