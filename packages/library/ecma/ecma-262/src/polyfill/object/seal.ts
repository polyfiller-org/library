import {SUPPORTS_OBJECT_SEAL} from "../../support/object/seal";
import {patchObjectSeal} from "../../patch/object/seal";

if (!SUPPORTS_OBJECT_SEAL) {
	patchObjectSeal();
}
