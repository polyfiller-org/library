import {SUPPORTS_ARRAY_PROTOTYPE_FLAT} from "../../../support/array/prototype/flat";
import {patchArrayPrototypeFlat} from "../../../patch/array/prototype/flat";

if (!SUPPORTS_ARRAY_PROTOTYPE_FLAT) {
	patchArrayPrototypeFlat();
}
