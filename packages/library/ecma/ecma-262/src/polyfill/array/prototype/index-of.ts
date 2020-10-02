import {SUPPORTS_ARRAY_PROTOTYPE_INDEX_OF} from "../../../support/array/prototype/index-of";
import {patchArrayPrototypeIndexOf} from "../../../patch/array/prototype/index-of";

if (!SUPPORTS_ARRAY_PROTOTYPE_INDEX_OF) {
	patchArrayPrototypeIndexOf();
}
