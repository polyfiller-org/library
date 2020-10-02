import {SUPPORTS_ARRAY_PROTOTYPE_SLICE} from "../../../support/array/prototype/slice";
import {patchArrayPrototypeSlice} from "../../../patch/array/prototype/slice";

if (!SUPPORTS_ARRAY_PROTOTYPE_SLICE) {
	patchArrayPrototypeSlice();
}
