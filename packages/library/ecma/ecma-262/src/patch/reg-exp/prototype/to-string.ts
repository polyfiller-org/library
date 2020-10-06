import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {RegExpConstructor} from "../../../reg-exp/reg-exp";
import {regExpPrototypeToString} from "../../../reg-exp/prototype/to-string";

export function patchRegExpPrototypeToString(): void {
	// RegExp.prototype.toString
	OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "toString", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": regExpPrototypeToString
	});
}
