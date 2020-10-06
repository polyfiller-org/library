import {SUPPORTS_OBJECT_ENTRIES} from "../../support/object/entries";
import {patchObjectEntries} from "../../patch/object/entries";

if (!SUPPORTS_OBJECT_ENTRIES) {
	patchObjectEntries();
}
