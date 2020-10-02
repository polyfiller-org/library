import {SUPPORTS_ARRAY_PROTOTYPE_REDUCE} from "../../../support/array/prototype/reduce";
import {patchArrayPrototypeReduce} from "../../../patch/array/prototype/reduce";

if (!SUPPORTS_ARRAY_PROTOTYPE_REDUCE) {
	patchArrayPrototypeReduce();
}
