import {SUPPORTS_OBJECT_GET_OWN_PROPERTY_NAMES} from "../../support/object/get-own-property-names";
import {patchObjectGetOwnPropertyNames} from "../../patch/object/get-own-property-names";

if (!SUPPORTS_OBJECT_GET_OWN_PROPERTY_NAMES) {
	patchObjectGetOwnPropertyNames();
}
