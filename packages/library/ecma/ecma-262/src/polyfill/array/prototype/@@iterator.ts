import {SUPPORTS_ARRAY_PROTOTYPE_SYMBOL_ITERATOR} from "../../../support/array/prototype/@@iterator";
import {patchArrayPrototypeSymbolIterator} from "../../../patch/array/prototype/@@iterator";

if (!SUPPORTS_ARRAY_PROTOTYPE_SYMBOL_ITERATOR) {
	patchArrayPrototypeSymbolIterator();
}
