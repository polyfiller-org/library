import {SUPPORTS_ARRAY_PROTOTYPE_SPLICE} from "../../../support/array/prototype/splice";
import {patchArrayPrototypeSplice} from "../../../patch/array/prototype/splice";

if (!SUPPORTS_ARRAY_PROTOTYPE_SPLICE) {
	patchArrayPrototypeSplice();
}
