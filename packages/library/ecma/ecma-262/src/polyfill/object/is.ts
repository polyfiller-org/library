import {SUPPORTS_OBJECT_IS} from "../../support/object/is";
import {patchObjectIs} from "../../patch/object/is";

if (!SUPPORTS_OBJECT_IS) {
	patchObjectIs();
}
