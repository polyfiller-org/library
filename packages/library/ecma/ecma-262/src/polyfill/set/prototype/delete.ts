import {SUPPORTS_SET_PROTOTYPE_DELETE} from "../../../support/set/prototype/delete";
import {patchSetPrototypeDelete} from "../../../patch/set/prototype/delete";

if (!SUPPORTS_SET_PROTOTYPE_DELETE) {
	patchSetPrototypeDelete();
}
