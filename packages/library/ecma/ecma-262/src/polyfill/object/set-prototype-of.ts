import {SUPPORTS_OBJECT_SET_PROTOTYPE_OF} from "../../support/object/set-prototype-of";
import {patchObjectSetPrototypeOf} from "../../patch/object/set-prototype-of";

if (!SUPPORTS_OBJECT_SET_PROTOTYPE_OF) {
	patchObjectSetPrototypeOf();
}
