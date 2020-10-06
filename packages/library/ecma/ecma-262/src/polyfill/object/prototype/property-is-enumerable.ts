import {SUPPORTS_OBJECT_PROTOTYPE_PROPERTY_IS_ENUMERABLE} from "../../../support/object/prototype/property-is-enumerable";
import {patchObjectPrototypePropertyIsEnumerable} from "../../../patch/object/prototype/property-is-enumerable";

if (!SUPPORTS_OBJECT_PROTOTYPE_PROPERTY_IS_ENUMERABLE) {
	patchObjectPrototypePropertyIsEnumerable();
}
