import {SUPPORTS_ARRAY_PROTOTYPE_REVERSE} from "../../../support/array/prototype/reverse";
import {patchArrayPrototypeReverse} from "../../../patch/array/prototype/reverse";

if (!SUPPORTS_ARRAY_PROTOTYPE_REVERSE) {
	patchArrayPrototypeReverse();
}
