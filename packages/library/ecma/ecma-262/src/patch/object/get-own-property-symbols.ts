import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectGetOwnPropertySymbols} from "../../object/get-own-property-symbols";

export function patchObjectGetOwnPropertySymbols(): void {
	// Object.getOwnPropertySymbols
	OrdinaryDefineOwnProperty(Object, "getOwnPropertySymbols", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectGetOwnPropertySymbols
	});
}
