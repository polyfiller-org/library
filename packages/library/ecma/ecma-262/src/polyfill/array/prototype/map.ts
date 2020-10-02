import {SUPPORTS_ARRAY_PROTOTYPE_MAP} from "../../../support/array/prototype/map";
import {patchArrayPrototypeMap} from "../../../patch/array/prototype/map";

if (!SUPPORTS_ARRAY_PROTOTYPE_MAP) {
	patchArrayPrototypeMap();
}
