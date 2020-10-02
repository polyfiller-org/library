import {SUPPORTS_SYMBOL_TO_STRING_TAG} from "../../support/symbol/to-string-tag";
import {patchSymbolToStringTag} from "../../patch/symbol/to-string-tag";

if (!SUPPORTS_SYMBOL_TO_STRING_TAG) {
	patchSymbolToStringTag();
}
