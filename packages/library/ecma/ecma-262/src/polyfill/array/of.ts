import {SUPPORTS_ARRAY_OF} from "../../support/array/of";
import {patchArrayOf} from "../../patch/array/of";

if (!SUPPORTS_ARRAY_OF) {
	patchArrayOf();
}
