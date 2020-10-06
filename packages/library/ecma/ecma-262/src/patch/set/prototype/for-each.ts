import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeForEach} from "../../../set/prototype/for-each";

export function patchSetPrototypeForEach(): void {
	// Set.prototype.forEach
	OrdinaryDefineOwnProperty(Set.prototype, "forEach", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeForEach
	});
}
