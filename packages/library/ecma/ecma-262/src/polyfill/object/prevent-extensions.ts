import {SUPPORTS_OBJECT_PREVENT_EXTENSIONS} from "../../support/object/prevent-extensions";
import {patchObjectPreventExtensions} from "../../patch/object/prevent-extensions";

if (!SUPPORTS_OBJECT_PREVENT_EXTENSIONS) {
	patchObjectPreventExtensions();
}
