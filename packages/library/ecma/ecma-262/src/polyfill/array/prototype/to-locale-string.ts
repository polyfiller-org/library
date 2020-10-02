import {SUPPORTS_ARRAY_PROTOTYPE_TO_LOCALE_STRING} from "../../../support/array/prototype/to-locale-string";
import {patchArrayPrototypeToLocaleString} from "../../../patch/array/prototype/to-locale-string";

if (!SUPPORTS_ARRAY_PROTOTYPE_TO_LOCALE_STRING) {
	patchArrayPrototypeToLocaleString();
}
