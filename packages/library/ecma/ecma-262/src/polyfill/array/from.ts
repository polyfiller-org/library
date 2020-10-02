import {SUPPORTS_ARRAY_FROM} from "../../support/array/from";
import {patchArrayFrom} from "../../patch/array/from";

if (!SUPPORTS_ARRAY_FROM) {
	patchArrayFrom();
}
