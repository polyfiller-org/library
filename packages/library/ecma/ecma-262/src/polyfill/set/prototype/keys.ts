import {SUPPORTS_SET_PROTOTYPE_KEYS} from "../../../support/set/prototype/keys";
import {patchSetPrototypeKeys} from "../../../patch/set/prototype/keys";

if (!SUPPORTS_SET_PROTOTYPE_KEYS) {
	patchSetPrototypeKeys();
}
