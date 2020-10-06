import {SUPPORTS_SET_PROTOTYPE_SYMBOL_TO_STRING_TAG} from "../../../support/set/prototype/@@to-string-tag";
import {patchSetPrototypeSymbolToStringTag} from "../../../patch/set/prototype/@@to-string-tag";

if (!SUPPORTS_SET_PROTOTYPE_SYMBOL_TO_STRING_TAG) {
	patchSetPrototypeSymbolToStringTag();
}
