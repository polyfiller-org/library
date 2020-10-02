import {SUPPORTS_ARRAY_PROTOTYPE_UNSHIFT} from "../../../support/array/prototype/unshift";
import {patchArrayPrototypeUnshift} from "../../../patch/array/prototype/unshift";

if (!SUPPORTS_ARRAY_PROTOTYPE_UNSHIFT) {
	patchArrayPrototypeUnshift();
}
