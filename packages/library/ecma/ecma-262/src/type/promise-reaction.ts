import {ArbitraryFunction} from "./arbitrary-function";
import {PromiseCapability} from "./promise-capability";

export interface PromiseReaction<T = unknown> {
	"[[Capability]]": PromiseCapability<T> | undefined;
	"[[Type]]": "Fulfill" | "Reject";
	"[[Handler]]": ArbitraryFunction | undefined;
}
