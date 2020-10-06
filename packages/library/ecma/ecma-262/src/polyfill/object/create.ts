import {SUPPORTS_OBJECT_CREATE} from "../../support/object/create";
import {patchObjectCreate} from "../../patch/object/create";

if (!SUPPORTS_OBJECT_CREATE) {
	patchObjectCreate();
}
