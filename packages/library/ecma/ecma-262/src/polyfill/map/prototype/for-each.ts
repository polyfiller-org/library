import {SUPPORTS_MAP_PROTOTYPE_FOR_EACH} from "../../../support/map/prototype/for-each";
import {patchMapPrototypeForEach} from "../../../patch/map/prototype/for-each";

if (!SUPPORTS_MAP_PROTOTYPE_FOR_EACH) {
	patchMapPrototypeForEach();
}
