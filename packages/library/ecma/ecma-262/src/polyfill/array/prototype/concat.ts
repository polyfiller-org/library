import {SUPPORTS_ARRAY_PROTOTYPE_CONCAT} from "../../../support/array/prototype/concat";
import {patchArrayPrototypeConcat} from "../../../patch/array/prototype/concat";

if (!SUPPORTS_ARRAY_PROTOTYPE_CONCAT) {
	patchArrayPrototypeConcat();
}
