import {SUPPORTS_OBJECT_KEYS} from "../../support/object/keys";
import {patchObjectKeys} from "../../patch/object/keys";

if (!SUPPORTS_OBJECT_KEYS) {
	patchObjectKeys();
}
