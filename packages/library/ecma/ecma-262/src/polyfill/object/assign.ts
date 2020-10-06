import {SUPPORTS_OBJECT_ASSIGN} from "../../support/object/assign";
import {patchObjectAssign} from "../../patch/object/assign";

if (!SUPPORTS_OBJECT_ASSIGN) {
	patchObjectAssign();
}
