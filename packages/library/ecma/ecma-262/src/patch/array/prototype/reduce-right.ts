import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeReduceRight} from "../../../array/prototype/reduce-right";

export function patchArrayPrototypeReduceRight(): void {
	// Array.prototype.reduceRight
	OrdinaryDefineOwnProperty(Array.prototype, "reduceRight", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeReduceRight
	});
}
