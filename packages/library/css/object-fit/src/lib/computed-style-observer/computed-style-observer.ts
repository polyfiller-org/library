import {ComputedStyleCallback} from "./computed-style-callback";
import {ComputedStyleRecord} from "./computed-style-record";
import {IComputedStyleObserver} from "./i-computed-style-observer";
import {COMPUTED_STYLE_OBSERVER_INTERNALS_MAP, initializeComputedStyleObserver} from "./computed-style-observer-internals";
import {ComputedStyleObserverInit} from "./computed-style-observer-init";

/**
 * An Observer that tracks changes to observed computed styles for an Element
 */
export class ComputedStyleObserver implements IComputedStyleObserver {
	constructor(callback: ComputedStyleCallback) {
		if (new.target === undefined) {
			throw new TypeError(`Constructor ${ComputedStyleObserver.name} requires 'new'`);
		}

		// Validate that a Callback is given
		if (callback === undefined) {
			throw new ReferenceError(`Failed to construct '${ComputedStyleObserver.name}': 1 argument required, but only 0 present.`);
		}

		// Validate that the given callback is in fact a function
		else if (typeof callback !== "function") {
			throw new TypeError(`Failed to construct '${ComputedStyleObserver.name}': The callback provided as parameter 1 is not a function.`);
		}

		// Add this ComputedStyleObserver to the Set of ComputedStyleObservers
		initializeComputedStyleObserver(this, callback);
	}

	/**
	 * The Symbol.@@toStringTag value
	 */
	get [Symbol.toStringTag]() {
		return `ComputedStyleObserver`;
	}

	/**
	 * Observes the given Element for changes to its computed styles
	 */
	observe(target: Element, init: ComputedStyleObserverInit): void {
		// Ensure that a target is given
		if (target === undefined) {
			throw new ReferenceError(`Failed to execute '${this.observe.name}' on '${ComputedStyleObserver.name}': 2 arguments required, but only 0 present.`);
		}

		// Ensure that it is in fact an Element
		else if (!(target instanceof Element)) {
			throw new TypeError(`Failed to execute '${this.observe.name}' on '${ComputedStyleObserver.name}': parameter 1 is not of type 'Element'.`);
		}

		// Ensure that initialization options are given
		else if (init === undefined) {
			throw new ReferenceError(`Failed to execute '${this.observe.name}' on '${ComputedStyleObserver.name}': 2 arguments required, but only 1 present.`);
		}

		// Ensure that it is in fact an Element
		else if (init.propertyNames == null || !Array.isArray(init.propertyNames)) {
			throw new TypeError(`Failed to execute '${this.observe.name}' on '${ComputedStyleObserver.name}': parameter 2 is not of type 'ComputedStyleObserverInit'.`);
		}

		const internals = COMPUTED_STYLE_OBSERVER_INTERNALS_MAP.get(this);
		if (internals == null) return;

		// Mark the target as observed
		internals.addObservedTarget(target, init);
	}

	/**
	 * Takes the records immediately (instead of waiting for the next flush)
	 */
	takeRecords(): ComputedStyleRecord[] {
		const internals = COMPUTED_STYLE_OBSERVER_INTERNALS_MAP.get(this);
		if (internals == null) return [];
		return internals.clearQueue();
	}

	/**
	 * Disconnects the ConnectionObserver such that none of its callbacks will be invoked any longer
	 */
	disconnect(): void {
		const internals = COMPUTED_STYLE_OBSERVER_INTERNALS_MAP.get(this);
		if (internals == null) return;
		internals.clearObservedTargets();
	}
}
