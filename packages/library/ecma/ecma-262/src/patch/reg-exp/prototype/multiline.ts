import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeMultiline} from "../../../reg-exp/prototype/multiline";

export function patchRegExpPrototypeMultiline(): void {
	// RegExp.prototype.multiline
	OrdinaryDefineOwnProperty(RegExp.prototype, "multiline", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeMultiline
	});
}
