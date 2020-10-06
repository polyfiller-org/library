import {SUPPORTS_OBJECT_GET_OWN_PROPERTY_DESCRIPTOR} from "../../support/object/get-own-property-descriptor";
import {patchObjectGetOwnPropertyDescriptor} from "../../patch/object/get-own-property-descriptor";

if (!SUPPORTS_OBJECT_GET_OWN_PROPERTY_DESCRIPTOR) {
	patchObjectGetOwnPropertyDescriptor();
}
