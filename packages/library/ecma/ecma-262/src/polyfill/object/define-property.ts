import {SUPPORTS_OBJECT_DEFINE_PROPERTY} from "../../support/object/define-property";
import {patchObjectDefineProperty} from "../../patch/object/define-property";

if (!SUPPORTS_OBJECT_DEFINE_PROPERTY) {
	patchObjectDefineProperty();
}
