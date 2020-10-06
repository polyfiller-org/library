import {SUPPORTS_OBJECT_IS_EXTENSIBLE} from "../../support/object/is-extensible";
import {patchObjectIsExtensible} from "../../patch/object/is-extensible";

if (!SUPPORTS_OBJECT_IS_EXTENSIBLE) {
	patchObjectIsExtensible();
}
