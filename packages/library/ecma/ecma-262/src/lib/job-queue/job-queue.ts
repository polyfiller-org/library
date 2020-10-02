import {PendingJob} from "../../type/pending-job";
import {ArbitraryFunction} from "../../type/arbitrary-function";

export interface JobQueue {
	schedule<Job extends ArbitraryFunction, Arguments extends Parameters<Job>>(job: PendingJob<Job, Arguments>): void;
}
