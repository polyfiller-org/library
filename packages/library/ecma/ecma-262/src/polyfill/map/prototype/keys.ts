import {SUPPORTS_MAP_PROTOTYPE_KEYS} from "../../../support/map/prototype/keys";
import {patchMapPrototypeKeys} from "../../../patch/map/prototype/keys";

if (!SUPPORTS_MAP_PROTOTYPE_KEYS) {
	patchMapPrototypeKeys();
}
