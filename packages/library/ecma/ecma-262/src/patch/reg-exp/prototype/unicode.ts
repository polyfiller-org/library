import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeUnicode} from "../../../reg-exp/prototype/unicode";

export function patchRegExpPrototypeUnicode(): void {
	// RegExp.prototype.unicode
	OrdinaryDefineOwnProperty(RegExp.prototype, "unicode", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeUnicode
	});
}
