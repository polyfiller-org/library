import {SUPPORTS_SET_PROTOTYPE_CLEAR} from "../../../support/set/prototype/clear";
import {patchSetPrototypeClear} from "../../../patch/set/prototype/clear";

if (!SUPPORTS_SET_PROTOTYPE_CLEAR) {
	patchSetPrototypeClear();
}
