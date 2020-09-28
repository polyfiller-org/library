import {ComputedStyleRecord} from "./computed-style-record";
import {ComputedStyleObserverInit} from "./computed-style-observer-init";
export interface IComputedStyleObserver {
	[Symbol.toStringTag]: string;

	/**
	 * Observes the given Element for changes to its computed styles
	 */
	observe(target: Element, init: ComputedStyleObserverInit): void;

	/**
	 * Takes the records immediately (instead of waiting for the next flush)
	 * @return {ComputedStyleRecord[]}
	 */
	takeRecords(): ComputedStyleRecord[];

	/**
	 * Disconnects the ComputedStyleObserver such that none of its callbacks will be invoked any longer
	 */
	disconnect(): void;
}
