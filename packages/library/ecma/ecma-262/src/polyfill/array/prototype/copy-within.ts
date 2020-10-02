import {SUPPORTS_ARRAY_PROTOTYPE_COPY_WITHIN} from "../../../support/array/prototype/copy-within";
import {patchArrayPrototypeCopyWithin} from "../../../patch/array/prototype/copy-within";

if (!SUPPORTS_ARRAY_PROTOTYPE_COPY_WITHIN) {
	patchArrayPrototypeCopyWithin();
}
