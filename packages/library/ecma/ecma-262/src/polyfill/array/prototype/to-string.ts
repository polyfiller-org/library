import {SUPPORTS_ARRAY_PROTOTYPE_TO_STRING} from "../../../support/array/prototype/to-string";
import {patchArrayPrototypeToString} from "../../../patch/array/prototype/to-string";

if (!SUPPORTS_ARRAY_PROTOTYPE_TO_STRING) {
	patchArrayPrototypeToString();
}
