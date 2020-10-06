import {SUPPORTS_OBJECT_IS_SEALED} from "../../support/object/is-sealed";
import {patchObjectIsSealed} from "../../patch/object/is-sealed";

if (!SUPPORTS_OBJECT_IS_SEALED) {
	patchObjectIsSealed();
}
