import {SUPPORTS_SET_PROTOTYPE_SYMBOL_ITERATOR} from "../../../support/set/prototype/@@iterator";
import {patchSetPrototypeSymbolIterator} from "../../../patch/set/prototype/@@iterator";

if (!SUPPORTS_SET_PROTOTYPE_SYMBOL_ITERATOR) {
	patchSetPrototypeSymbolIterator();
}
