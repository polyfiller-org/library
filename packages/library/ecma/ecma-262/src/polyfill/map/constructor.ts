import {SUPPORTS_MAP} from "../../support/map/constructor";
import {patchMapConstructor} from "../../patch/map/constructor";

if (!SUPPORTS_MAP) {
	patchMapConstructor();
}
