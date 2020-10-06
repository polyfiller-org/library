import {SUPPORTS_OBJECT_GET_OWN_PROPERTY_SYMBOLS} from "../../support/object/get-own-property-symbols";
import {patchObjectGetOwnPropertySymbols} from "../../patch/object/get-own-property-symbols";

if (!SUPPORTS_OBJECT_GET_OWN_PROPERTY_SYMBOLS) {
	patchObjectGetOwnPropertySymbols();
}
