import {SUPPORTS_ARRAY_PROTOTYPE_FIND_INDEX} from "../../../support/array/prototype/find-index";
import {patchArrayPrototypeFindIndex} from "../../../patch/array/prototype/find-index";

if (!SUPPORTS_ARRAY_PROTOTYPE_FIND_INDEX) {
	patchArrayPrototypeFindIndex();
}
