import {SUPPORTS_MAP_PROTOTYPE_SYMBOL_ITERATOR} from "../../../support/map/prototype/@@iterator";
import {patchMapPrototypeSymbolIterator} from "../../../patch/map/prototype/@@iterator";

if (!SUPPORTS_MAP_PROTOTYPE_SYMBOL_ITERATOR) {
	patchMapPrototypeSymbolIterator();
}
