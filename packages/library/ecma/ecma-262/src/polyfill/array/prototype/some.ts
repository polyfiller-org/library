import {SUPPORTS_ARRAY_PROTOTYPE_SOME} from "../../../support/array/prototype/some";
import {patchArrayPrototypeSome} from "../../../patch/array/prototype/some";

if (!SUPPORTS_ARRAY_PROTOTYPE_SOME) {
	patchArrayPrototypeSome();
}
