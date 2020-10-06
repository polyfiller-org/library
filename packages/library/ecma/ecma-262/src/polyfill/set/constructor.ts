import {SUPPORTS_SET} from "../../support/set/constructor";
import {patchSetConstructor} from "../../patch/set/constructor";

if (!SUPPORTS_SET) {
	patchSetConstructor();
}
