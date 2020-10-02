import {SUPPORTS_ARRAY_PROTOTYPE_PUSH} from "../../../support/array/prototype/push";
import {patchArrayPrototypePush} from "../../../patch/array/prototype/push";

if (!SUPPORTS_ARRAY_PROTOTYPE_PUSH) {
	patchArrayPrototypePush();
}
