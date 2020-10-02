import {SUPPORTS_ARRAY_PROTOTYPE_SORT} from "../../../support/array/prototype/sort";
import {patchArrayPrototypeSort} from "../../../patch/array/prototype/sort";

if (!SUPPORTS_ARRAY_PROTOTYPE_SORT) {
	patchArrayPrototypeSort();
}
