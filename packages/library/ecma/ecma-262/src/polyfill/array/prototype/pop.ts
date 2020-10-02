import {SUPPORTS_ARRAY_PROTOTYPE_POP} from "../../../support/array/prototype/pop";
import {patchArrayPrototypePop} from "../../../patch/array/prototype/pop";

if (!SUPPORTS_ARRAY_PROTOTYPE_POP) {
	patchArrayPrototypePop();
}
