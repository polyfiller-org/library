import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeSource} from "../../../reg-exp/prototype/source";

export function patchRegExpPrototypeSource(): void {
	// RegExp.prototype.source
	OrdinaryDefineOwnProperty(RegExp.prototype, "source", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeSource
	});
}
