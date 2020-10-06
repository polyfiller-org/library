import {SUPPORTS_MAP_PROTOTYPE_CLEAR} from "../../../support/map/prototype/clear";
import {patchMapPrototypeClear} from "../../../patch/map/prototype/clear";

if (!SUPPORTS_MAP_PROTOTYPE_CLEAR) {
	patchMapPrototypeClear();
}
