import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeExec} from "../../../reg-exp/prototype/exec";

export function patchRegExpPrototypeExec(): void {
	// RegExp.prototype.exec
	OrdinaryDefineOwnProperty(RegExp.prototype, "exec", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": regExpPrototypeExec
	});
}
