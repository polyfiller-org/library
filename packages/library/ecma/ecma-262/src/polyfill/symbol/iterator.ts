import {SUPPORTS_SYMBOL_ITERATOR} from "../../support/symbol/iterator";
import {patchSymbolIterator} from "../../patch/symbol/iterator";

if (!SUPPORTS_SYMBOL_ITERATOR) {
	patchSymbolIterator();
}
