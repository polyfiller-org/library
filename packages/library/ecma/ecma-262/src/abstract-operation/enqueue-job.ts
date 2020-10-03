import {ArbitraryFunction} from "../type/arbitrary-function";
import {assert} from "./assert";
import {PendingJob} from "../type/pending-job";
import {JobQueue} from "../lib/job-queue/job-queue";
import {NormalCompletion} from "./normal-completion";
import {Completion} from "../type/completion";
import {EMPTY, empty} from "../type/empty";

/**
 * https://tc39.es/ecma262/#sec-enqueuejob
 */
export function EnqueueJob<Job extends ArbitraryFunction, Arguments extends Parameters<Job>>(queue: JobQueue, job: Job, args: Arguments): Completion<empty> {
	// Assert: Type(queueName) is String and its value is the name of a Job Queue recognized by this implementation.
	// NOTE: Due to tree-shaking considerations, rather than taking a queue name, the queue is provided directly as an argument

	// Assert: job is the name of a Job.
	assert(typeof job === "function");

	// Assert: arguments is a List that has the same number of elements as the number of parameters required by job.
	assert(job.length === args.length);

	// Let callerContext be the running execution context.
	// Let callerRealm be callerContext's Realm.
	// Let callerScriptOrModule be callerContext's ScriptOrModule.
	// Let pending be PendingJob { [[Job]]: job, [[Arguments]]: arguments, [[Realm]]: callerRealm, [[ScriptOrModule]]: callerScriptOrModule, [[HostDefined]]: undefined }.
	const pending: PendingJob<Job, Arguments> = {
		"[[Job]]": job,
		"[[Arguments]]": args,
		"[[HostDefined]]": undefined
	};

	// Perform any implementation or host environment defined processing of pending.
	// This may include modifying the [[HostDefined]] field or any other field of pending.
	// Add pending at the back of the Job Queue named by queueName.
	queue.schedule(pending);

	// Return NormalCompletion(empty).
	return NormalCompletion(EMPTY);
}
