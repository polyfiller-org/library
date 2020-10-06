import {SUPPORTS_OBJECT_PROTOTYPE_IS_PROTOTYPE_OF} from "../../../support/object/prototype/is-prototype-of";
import {patchObjectPrototypeIsPrototypeOf} from "../../../patch/object/prototype/is-prototype-of";

if (!SUPPORTS_OBJECT_PROTOTYPE_IS_PROTOTYPE_OF) {
	patchObjectPrototypeIsPrototypeOf();
}
