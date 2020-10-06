import {SUPPORTS_STRING_PROTOTYPE_SYMBOL_ITERATOR} from "../../../support/string/prototype/@@iterator";
import {patchStringPrototypeSymbolIterator} from "../../../patch/string/prototype/@@iterator";

if (!SUPPORTS_STRING_PROTOTYPE_SYMBOL_ITERATOR) {
	patchStringPrototypeSymbolIterator();
}
