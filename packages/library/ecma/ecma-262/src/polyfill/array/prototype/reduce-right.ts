import {SUPPORTS_ARRAY_PROTOTYPE_REDUCE_RIGHT} from "../../../support/array/prototype/reduce-right";
import {patchArrayPrototypeReduceRight} from "../../../patch/array/prototype/reduce-right";

if (!SUPPORTS_ARRAY_PROTOTYPE_REDUCE_RIGHT) {
	patchArrayPrototypeReduceRight();
}
