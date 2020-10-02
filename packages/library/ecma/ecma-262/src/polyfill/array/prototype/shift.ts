import {SUPPORTS_ARRAY_PROTOTYPE_SHIFT} from "../../../support/array/prototype/shift";
import {patchArrayPrototypeShift} from "../../../patch/array/prototype/shift";

if (!SUPPORTS_ARRAY_PROTOTYPE_SHIFT) {
	patchArrayPrototypeShift();
}
