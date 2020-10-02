import {ArbitraryFunction} from "../type/arbitrary-function";
import {Completion} from "../type/completion";
import {NormalCompletion} from "../abstract-operation/normal-completion";
import {ThrowCompletion} from "../abstract-operation/throw-completion";

export function executeWithCompletion<Func extends ArbitraryFunction>(func: Func): Completion<ReturnType<Func>> {
	try {
		return NormalCompletion(func());
	} catch (ex) {
		return ThrowCompletion(ex);
	}
}
