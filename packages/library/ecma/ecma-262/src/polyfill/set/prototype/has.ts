import {SUPPORTS_SET_PROTOTYPE_HAS} from "../../../support/set/prototype/has";
import {patchSetPrototypeHas} from "../../../patch/set/prototype/has";

if (!SUPPORTS_SET_PROTOTYPE_HAS) {
	patchSetPrototypeHas();
}
