import {SUPPORTS_ARRAY_PROTOTYPE_JOIN} from "../../../support/array/prototype/join";
import {patchArrayPrototypeJoin} from "../../../patch/array/prototype/join";

if (!SUPPORTS_ARRAY_PROTOTYPE_JOIN) {
	patchArrayPrototypeJoin();
}
