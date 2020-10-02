import {ArbitraryFunction} from "./arbitrary-function";

export interface PendingJob<Job extends ArbitraryFunction, Arguments extends Parameters<Job>> {
	"[[Job]]": Job;
	"[[Arguments]]": Arguments;
	"[[HostDefined]]": undefined;
	// "[[Realm]]": typeof globalThis;
	// "[[ScriptOrModule]]": undefined;
}
