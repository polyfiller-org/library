import {SUPPORTS_SET_PROTOTYPE_SIZE} from "../../../support/set/prototype/size";
import {patchSetPrototypeSize} from "../../../patch/set/prototype/size";

if (!SUPPORTS_SET_PROTOTYPE_SIZE) {
	patchSetPrototypeSize();
}
