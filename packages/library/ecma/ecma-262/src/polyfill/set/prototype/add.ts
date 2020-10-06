import {SUPPORTS_SET_PROTOTYPE_ADD} from "../../../support/set/prototype/add";
import {patchSetPrototypeAdd} from "../../../patch/set/prototype/add";

if (!SUPPORTS_SET_PROTOTYPE_ADD) {
	patchSetPrototypeAdd();
}
