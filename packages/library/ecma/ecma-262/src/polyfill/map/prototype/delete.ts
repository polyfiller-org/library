import {SUPPORTS_MAP_PROTOTYPE_DELETE} from "../../../support/map/prototype/delete";
import {patchMapPrototypeDelete} from "../../../patch/map/prototype/delete";

if (!SUPPORTS_MAP_PROTOTYPE_DELETE) {
	patchMapPrototypeDelete();
}
