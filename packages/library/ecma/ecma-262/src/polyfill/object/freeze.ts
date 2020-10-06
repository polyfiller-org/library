import {SUPPORTS_OBJECT_FREEZE} from "../../support/object/freeze";
import {patchObjectFreeze} from "../../patch/object/freeze";

if (!SUPPORTS_OBJECT_FREEZE) {
	patchObjectFreeze();
}
