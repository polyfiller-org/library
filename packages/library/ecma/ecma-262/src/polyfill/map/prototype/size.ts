import {SUPPORTS_MAP_PROTOTYPE_SIZE} from "../../../support/map/prototype/size";
import {patchMapPrototypeSize} from "../../../patch/map/prototype/size";

if (!SUPPORTS_MAP_PROTOTYPE_SIZE) {
	patchMapPrototypeSize();
}
