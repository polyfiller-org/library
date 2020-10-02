import {SUPPORTS_ARRAY_PROTOTYPE_KEYS} from "../../../support/array/prototype/keys";
import {patchArrayPrototypeKeys} from "../../../patch/array/prototype/keys";

if (!SUPPORTS_ARRAY_PROTOTYPE_KEYS) {
	patchArrayPrototypeKeys();
}
