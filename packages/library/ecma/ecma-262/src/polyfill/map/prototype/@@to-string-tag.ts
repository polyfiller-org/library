import {SUPPORTS_MAP_PROTOTYPE_SYMBOL_TO_STRING_TAG} from "../../../support/map/prototype/@@to-string-tag";
import {patchMapPrototypeSymbolToStringTag} from "../../../patch/map/prototype/@@to-string-tag";

if (!SUPPORTS_MAP_PROTOTYPE_SYMBOL_TO_STRING_TAG) {
	patchMapPrototypeSymbolToStringTag();
}
