import {SUPPORTS_MAP_PROTOTYPE_SET} from "../../../support/map/prototype/set";
import {patchMapPrototypeSet} from "../../../patch/map/prototype/set";

if (!SUPPORTS_MAP_PROTOTYPE_SET) {
	patchMapPrototypeSet();
}
