import {SUPPORTS_OBJECT_VALUES} from "../../support/object/values";
import {patchObjectValues} from "../../patch/object/values";

if (!SUPPORTS_OBJECT_VALUES) {
	patchObjectValues();
}
