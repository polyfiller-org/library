import {SUPPORTS_SET_PROTOTYPE_FOR_EACH} from "../../../support/set/prototype/for-each";
import {patchSetPrototypeForEach} from "../../../patch/set/prototype/for-each";

if (!SUPPORTS_SET_PROTOTYPE_FOR_EACH) {
	patchSetPrototypeForEach();
}
