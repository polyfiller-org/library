import {SUPPORTS_ARRAY_PROTOTYPE_FIND} from "../../../support/array/prototype/find";
import {patchArrayPrototypeFind} from "../../../patch/array/prototype/find";

if (!SUPPORTS_ARRAY_PROTOTYPE_FIND) {
	patchArrayPrototypeFind();
}
