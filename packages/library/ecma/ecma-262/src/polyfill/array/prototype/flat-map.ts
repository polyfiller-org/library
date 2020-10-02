import {SUPPORTS_ARRAY_PROTOTYPE_FLAT_MAP} from "../../../support/array/prototype/flat-map";
import {patchArrayPrototypeFlatMap} from "../../../patch/array/prototype/flat-map";

if (!SUPPORTS_ARRAY_PROTOTYPE_FLAT_MAP) {
	patchArrayPrototypeFlatMap();
}
