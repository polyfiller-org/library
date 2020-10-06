import {SUPPORTS_OBJECT_DEFINE_PROPERTIES} from "../../support/object/define-properties";
import {patchObjectDefineProperties} from "../../patch/object/define-properties";

if (!SUPPORTS_OBJECT_DEFINE_PROPERTIES) {
	patchObjectDefineProperties();
}
