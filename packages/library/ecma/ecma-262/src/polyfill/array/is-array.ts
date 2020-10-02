import {SUPPORTS_ARRAY_IS_ARRAY} from "../../support/array/is-array";
import {patchArrayIsArray} from "../../patch/array/is-array";

if (!SUPPORTS_ARRAY_IS_ARRAY) {
	patchArrayIsArray();
}
