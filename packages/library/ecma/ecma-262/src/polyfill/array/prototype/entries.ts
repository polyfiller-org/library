import {SUPPORTS_ARRAY_PROTOTYPE_ENTRIES} from "../../../support/array/prototype/entries";
import {patchArrayPrototypeEntries} from "../../../patch/array/prototype/entries";

if (!SUPPORTS_ARRAY_PROTOTYPE_ENTRIES) {
	patchArrayPrototypeEntries();
}
