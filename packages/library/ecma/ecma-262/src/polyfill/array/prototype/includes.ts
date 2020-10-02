import {SUPPORTS_ARRAY_PROTOTYPE_INCLUDES} from "../../../support/array/prototype/includes";
import {patchArrayPrototypeIncludes} from "../../../patch/array/prototype/includes";

if (!SUPPORTS_ARRAY_PROTOTYPE_INCLUDES) {
	patchArrayPrototypeIncludes();
}
