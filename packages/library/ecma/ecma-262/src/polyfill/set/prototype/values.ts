import {SUPPORTS_SET_PROTOTYPE_VALUES} from "../../../support/set/prototype/values";
import {patchSetPrototypeValues} from "../../../patch/set/prototype/values";

if (!SUPPORTS_SET_PROTOTYPE_VALUES) {
	patchSetPrototypeValues();
}
