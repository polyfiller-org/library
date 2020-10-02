import {SUPPORTS_ARRAY_PROTOTYPE_VALUES} from "../../../support/array/prototype/values";
import {patchArrayPrototypeValues} from "../../../patch/array/prototype/values";

if (!SUPPORTS_ARRAY_PROTOTYPE_VALUES) {
	patchArrayPrototypeValues();
}
