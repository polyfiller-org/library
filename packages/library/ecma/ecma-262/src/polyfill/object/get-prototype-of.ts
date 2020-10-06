import {SUPPORTS_OBJECT_GET_PROTOTYPE_OF} from "../../support/object/get-prototype-of";
import {patchObjectGetPrototypeOf} from "../../patch/object/get-prototype-of";

if (!SUPPORTS_OBJECT_GET_PROTOTYPE_OF) {
	patchObjectGetPrototypeOf();
}
