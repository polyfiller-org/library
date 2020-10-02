import {ArbitraryFunction} from "./arbitrary-function";
import {InternalPromise} from "./internal-promise";

export interface PromiseCapability<T = unknown> {
	"[[Promise]]": undefined | InternalPromise<T>;
	"[[Resolve]]": undefined | ArbitraryFunction;
	"[[Reject]]": undefined | ArbitraryFunction;
}
