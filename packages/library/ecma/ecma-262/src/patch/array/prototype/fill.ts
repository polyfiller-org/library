import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import { arrayPrototypeFill } from '../../../array/prototype/fill';

export function patchArrayPrototypeFill(): void {
	// Array.prototype.fill
	OrdinaryDefineOwnProperty(Array.prototype, "fill", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeFill
	});
}
