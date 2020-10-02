import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeFilter} from "../../../array/prototype/filter";

export function patchArrayPrototypeFilter(): void {
	// Array.prototype.filter
	OrdinaryDefineOwnProperty(Array.prototype, "filter", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeFilter
	});
}
