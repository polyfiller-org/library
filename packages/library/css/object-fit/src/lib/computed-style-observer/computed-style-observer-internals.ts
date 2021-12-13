import {ComputedStylePropertyChange, ComputedStyleRecord} from "./computed-style-record";
import {ComputedStyleObserver} from "./computed-style-observer";
import {ComputedStyleCallback} from "./computed-style-callback";
import {IComputedStyleObserver} from "./i-computed-style-observer";
import {ComputedStyleObserverInit} from "./computed-style-observer-init";
import {getPropertyValue, nextMicrotask} from "../../util/util";
import {CSSStyleDeclarationView, Disconnectable} from "../../type/type";
import {ElementOf} from "helpertypes";

export const COMPUTED_STYLE_OBSERVER_INTERNALS_MAP: Map<IComputedStyleObserver, ComputedStyleObserverInternals> = new Map();

export interface ComputedStyleObserverInternals {
	/**
	 * A Map of all observer Elements and their initialization options
	 */
	readonly observedTargets: Map<Element, ComputedStyleObserverInit>;

	/**
	 * Clears the queue and returns the popped contents of it
	 */
	clearQueue(): ComputedStyleRecord[];

	/**
	 * Clears the observed targets
	 */
	clearObservedTargets(): void;

	/**
	 * Adds the given target to the Set of observed targets
	 */
	addObservedTarget(target: Element, init: ComputedStyleObserverInit): void;
}

export function initializeComputedStyleObserver(observer: ComputedStyleObserver, callback: ComputedStyleCallback): void {
	/**
	 * The ComputedStyleRecord queue
	 */
	const queue: Set<ComputedStyleRecord> = new Set();

	/**
	 * A Map of all observer Elements and their initialization options
	 */
	const observedTargets = new Map<Element, ComputedStyleObserverInit>();
	const nodeToMutationObserverMap = new Map<Element, Disconnectable>();
	const nodeToStylePollerMap = new Map<Element, Disconnectable>();

	/**
	 * A Map between Elements and their key-value pairs corresponding to observed CSS property names and their cached values
	 */
	const nodeToLastObservedPropertyValues = new Map<Element, Partial<CSSStyleDeclarationView>>();

	/**
	 * Whether a flush is scheduled
	 */
	let scheduled = false;

	/**
	 * Whether the queue is currently being flushed
	 */
	let flushing = false;

	/**
	 * Flushes the ConnectionRecord queue
	 */
	const flush = (): void => {
		flushing = true;
		const arr = [...queue];
		if (arr.length > 0) {
			callback(arr, observer);
		}
		queue.clear();

		scheduled = false;
		flushing = false;
	};

	/**
	 * Schedules a new read/write
	 * batch if one isn't pending.
	 */
	const scheduleFlush = (): void => {
		if (!scheduled) {
			scheduled = true;
			nextMicrotask(flush);
		}
	};

	/**
	 * Adds the given ConnectionRecord to the queue
	 */
	const addToQueue = (entry: ComputedStyleRecord): void => {
		queue.add(entry);

		if (!flushing) {
			scheduleFlush();
		}
	};

	/**
	 * Clears the queue and returns the popped contents of it
	 */
	const clearQueue = (): ComputedStyleRecord[] => {
		const items = [...queue];
		queue.clear();
		return items;
	};

	/**
	 * Clears the observed targets
	 */
	const clearObservedTargets = (): void => {
		for (const target of observedTargets.keys()) {
			const mutationObserver = nodeToMutationObserverMap.get(target);
			if (mutationObserver != null) {
				mutationObserver.disconnect();
			}

			const stylePoller = nodeToStylePollerMap.get(target);
			if (stylePoller != null) {
				stylePoller.disconnect();
			}
		}
		nodeToMutationObserverMap.clear();
		nodeToStylePollerMap.clear();
		observedTargets.clear();
	};

	/**
	 * Handles a mutation change for the given target Elements in the next animation frame
	 */
	const handleMutationChange = (targetNodes: Iterable<Element>): void => {
		requestAnimationFrame(() => executeMutationChange(targetNodes));
	};

	/**
	 * Handles a mutation change for the given target Elements
	 */
	const executeMutationChange = (targetNodes: Iterable<Element>): void => {
		for (const target of targetNodes) {
			// If the target node is not part of the observer nodes, skip it
			if (!observedTargets.has(target)) continue;
			const currentInit = observedTargets.get(target)!;

			// Take the cached last property values for the Element
			let lastPropertyValues = nodeToLastObservedPropertyValues.get(target);
			if (lastPropertyValues == null) {
				lastPropertyValues = {};
				nodeToLastObservedPropertyValues.set(target, lastPropertyValues);
			}

			let changed = false;
			const changes = new Map<ElementOf<typeof currentInit.propertyNames>, ComputedStylePropertyChange<ElementOf<typeof currentInit.propertyNames>>>();
			const computedStyle = getComputedStyle(target);

			for (const propertyName of currentInit.propertyNames) {
				const newValue = getPropertyValue({
					target,
					computedStyle,
					propertyName
				});
				const oldValue = lastPropertyValues[propertyName];
				if (newValue !== oldValue) {
					changed = true;
					changes.set(propertyName, {
						newValue,
						oldValue
					});
				}
				lastPropertyValues[propertyName] = newValue;
			}

			// If it isn't equal to the last value, or if there is no last value, invoke the observer
			if (changed) {
				addToQueue({
					declaration: computedStyle,
					changes,
					target: target
				});
			}
		}
	};

	/**
	 * Adds the given target to the Set of observed targets
	 */
	const addObservedTarget = (target: Element, init: ComputedStyleObserverInit): void => {
		const {strategy = "performance"} = init;

		observedTargets.set(target, init);
		handleMutationChange([target]);

		// Hook up a MutationObserver that listens for changes to the 'style' attribute
		if (!nodeToMutationObserverMap.has(target)) {
			const mutationObserver = new MutationObserver(entries => {
				for (const entry of entries) {
					if (entry.attributeName == null) continue;

					// If at least one attribute received a new value that it didn't have previously, treat it as a Mutation
					if (entry.oldValue !== target.getAttribute(entry.attributeName)) {
						handleMutationChange([target]);
						break;
					}
				}
			});

			// Observe the 'style' and 'class' attributes which is the closest thing we can get to a native way to observe changes
			// that will most likely cause recalculation of styles for the target element
			mutationObserver.observe(target, {
				attributes: true,
				attributeOldValue: true,
				attributeFilter: ["style", "class"]
			});
			nodeToMutationObserverMap.set(target, mutationObserver);
		}

		// Set up the style poller
		if (nodeToStylePollerMap.has(target)) {
			nodeToStylePollerMap.get(target)!.disconnect();
		}

		const interval = setInterval(() => handleMutationChange([target]), strategy === "performance" ? 2000 : strategy === "precision" ? 500 : strategy);
		nodeToStylePollerMap.set(target, {
			disconnect: () => clearInterval(interval)
		});
	};

	const internals: ComputedStyleObserverInternals = {
		observedTargets,
		addObservedTarget,
		clearObservedTargets,
		clearQueue
	};

	COMPUTED_STYLE_OBSERVER_INTERNALS_MAP.set(observer, internals);
}
