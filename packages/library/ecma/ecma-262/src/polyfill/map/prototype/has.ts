import {SUPPORTS_MAP_PROTOTYPE_HAS} from "../../../support/map/prototype/has";
import {patchMapPrototypeHas} from "../../../patch/map/prototype/has";

if (!SUPPORTS_MAP_PROTOTYPE_HAS) {
	patchMapPrototypeHas();
}
