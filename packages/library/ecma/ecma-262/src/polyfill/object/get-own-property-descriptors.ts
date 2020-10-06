import {SUPPORTS_OBJECT_GET_OWN_PROPERTY_DESCRIPTORS} from "../../support/object/get-own-property-descriptors";
import {patchObjectGetOwnPropertyDescriptors} from "../../patch/object/get-own-property-descriptors";

if (!SUPPORTS_OBJECT_GET_OWN_PROPERTY_DESCRIPTORS) {
	patchObjectGetOwnPropertyDescriptors();
}
