import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeValues} from "../../../set/prototype/values";

export function patchSetPrototypeValues(): void {
	// Set.prototype.values
	OrdinaryDefineOwnProperty(Set.prototype, "values", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeValues
	});
}
