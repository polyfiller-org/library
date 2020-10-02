import {SUPPORTS_ARRAY_PROTOTYPE_FILTER} from "../../../support/array/prototype/filter";
import {patchArrayPrototypeFilter} from "../../../patch/array/prototype/filter";

if (!SUPPORTS_ARRAY_PROTOTYPE_FILTER) {
	patchArrayPrototypeFilter();
}
