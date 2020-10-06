import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeTest} from "../../../reg-exp/prototype/test";

export function patchRegExpPrototypeTest(): void {
	// RegExp.prototype.test
	OrdinaryDefineOwnProperty(RegExp.prototype, "test", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": regExpPrototypeTest
	});
}
