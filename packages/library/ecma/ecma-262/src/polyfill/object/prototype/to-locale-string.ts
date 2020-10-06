import {SUPPORTS_OBJECT_PROTOTYPE_TO_LOCALE_STRING} from "../../../support/object/prototype/to-locale-string";
import {patchObjectPrototypeToLocaleString} from "../../../patch/object/prototype/to-locale-string";

if (!SUPPORTS_OBJECT_PROTOTYPE_TO_LOCALE_STRING) {
	patchObjectPrototypeToLocaleString();
}
