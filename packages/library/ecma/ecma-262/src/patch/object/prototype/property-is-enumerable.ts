import {objectPrototypePropertyIsEnumerable} from "../../../object/prototype/property-is-enumerable";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";

export function patchObjectPrototypePropertyIsEnumerable(): void {
	// Object.prototype.propertyIsEnumerable
	OrdinaryDefineOwnProperty(Object.prototype, "propertyIsEnumerable", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectPrototypePropertyIsEnumerable
	});
}
