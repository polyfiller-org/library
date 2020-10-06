import {SUPPORTS_OBJECT_FROM_ENTRIES} from "../../support/object/from-entries";
import {patchObjectFromEntries} from "../../patch/object/from-entries";

if (!SUPPORTS_OBJECT_FROM_ENTRIES) {
	patchObjectFromEntries();
}
