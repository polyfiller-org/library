import {SUPPORTS_MAP_PROTOTYPE_ENTRIES} from "../../../support/map/prototype/entries";
import {patchMapPrototypeEntries} from "../../../patch/map/prototype/entries";

if (!SUPPORTS_MAP_PROTOTYPE_ENTRIES) {
	patchMapPrototypeEntries();
}
