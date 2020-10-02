import {SUPPORTS_ARRAY_PROTOTYPE_LAST_INDEX_OF} from "../../../support/array/prototype/last-index-of";
import {patchArrayPrototypeLastIndexOf} from "../../../patch/array/prototype/last-index-of";

if (!SUPPORTS_ARRAY_PROTOTYPE_LAST_INDEX_OF) {
	patchArrayPrototypeLastIndexOf();
}
