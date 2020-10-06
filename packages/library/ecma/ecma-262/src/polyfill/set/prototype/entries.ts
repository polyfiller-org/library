import {SUPPORTS_SET_PROTOTYPE_ENTRIES} from "../../../support/set/prototype/entries";
import {patchSetPrototypeEntries} from "../../../patch/set/prototype/entries";

if (!SUPPORTS_SET_PROTOTYPE_ENTRIES) {
	patchSetPrototypeEntries();
}
