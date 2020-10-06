import {SUPPORTS_MAP_PROTOTYPE_GET} from "../../../support/map/prototype/get";
import {patchMapPrototypeGet} from "../../../patch/map/prototype/get";

if (!SUPPORTS_MAP_PROTOTYPE_GET) {
	patchMapPrototypeGet();
}
