import {SUPPORTS_MAP_PROTOTYPE_VALUES} from "../../../support/map/prototype/values";
import {patchMapPrototypeValues} from "../../../patch/map/prototype/values";

if (!SUPPORTS_MAP_PROTOTYPE_VALUES) {
	patchMapPrototypeValues();
}
