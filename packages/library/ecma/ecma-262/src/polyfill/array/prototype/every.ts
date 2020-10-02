import {SUPPORTS_ARRAY_PROTOTYPE_EVERY} from "../../../support/array/prototype/every";
import {patchArrayPrototypeEvery} from "../../../patch/array/prototype/every";

if (!SUPPORTS_ARRAY_PROTOTYPE_EVERY) {
	patchArrayPrototypeEvery();
}
