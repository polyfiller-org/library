import {SUPPORTS_OBJECT_IS_FROZEN} from "../../support/object/is-frozen";
import {patchObjectIsFrozen} from "../../patch/object/is-frozen";

if (!SUPPORTS_OBJECT_IS_FROZEN) {
	patchObjectIsFrozen();
}
