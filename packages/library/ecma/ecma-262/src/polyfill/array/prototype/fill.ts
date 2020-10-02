import {SUPPORTS_ARRAY_PROTOTYPE_FILL} from "../../../support/array/prototype/fill";
import {patchArrayPrototypeFill} from "../../../patch/array/prototype/fill";

if (!SUPPORTS_ARRAY_PROTOTYPE_FILL) {
	patchArrayPrototypeFill();
}
