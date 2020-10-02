import {ArbitraryFunction} from "../../type/arbitrary-function";
import {JobQueue} from "./job-queue";
import {PendingJob} from "../../type/pending-job";
import {makeList} from "../list/list";

const promiseImplementation = <Job extends ArbitraryFunction>() => {
	return (microtask: Job) => {
		Promise.resolve().then(microtask);
	};
};

/**
 * @return {!Function}
 */
const mutationObserverImplementation = <Job extends ArbitraryFunction>() => {
	let i = 0;
	let microtaskQueue = makeList<Job>();
	const observer = new MutationObserver(() => {
		for (let j = 0; j < microtaskQueue.length; i++) {
			microtaskQueue.get(j)();
		}
		microtaskQueue = makeList();
	});
	const node = document.createTextNode("");
	observer.observe(node, {characterData: true});

	return (microtask: Job) => {
		microtaskQueue.append(microtask);

		// Trigger a mutation observer callback, which is a microtask.
		node.data = String(++i % 2);
	};
};

export const PromiseJobQueue: JobQueue = (() => {
	const queue =
		typeof queueMicrotask === "function" && queueMicrotask.toString().indexOf("[native code]") > -1
			? queueMicrotask
			: typeof Promise === "function" && Promise.toString().indexOf("[native code]") > -1
			? promiseImplementation()
			: typeof MutationObserver !== "undefined"
			? mutationObserverImplementation()
			: setTimeout;

	return {
		schedule<Job extends ArbitraryFunction, Arguments extends Parameters<Job>>(job: PendingJob<Job, Arguments>): void {
			queue(() => job["[[Job]]"].apply(this, job["[[Arguments]]"] as []));
		}
	};
})();
