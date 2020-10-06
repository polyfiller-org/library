import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {objectPrototypeIsPrototypeOf} from "../../../object/prototype/is-prototype-of";

export function patchObjectPrototypeIsPrototypeOf(): void {
	// Object.prototype.isPrototypeOf
	OrdinaryDefineOwnProperty(Object.prototype, "isPrototypeOf", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectPrototypeIsPrototypeOf
	});
}
