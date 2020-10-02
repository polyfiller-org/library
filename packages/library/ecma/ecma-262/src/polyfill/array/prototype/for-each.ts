import {SUPPORTS_ARRAY_PROTOTYPE_FOR_EACH} from "../../../support/array/prototype/for-each";
import {patchArrayPrototypeForEach} from "../../../patch/array/prototype/for-each";

if (!SUPPORTS_ARRAY_PROTOTYPE_FOR_EACH) {
	patchArrayPrototypeForEach();
}
