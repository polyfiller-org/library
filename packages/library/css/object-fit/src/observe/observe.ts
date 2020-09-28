import {ConnectionObserver} from "@wessberg/connection-observer";
import {ExtendedHTMLImageElement, ExtendedHTMLVideoElement} from "../type/type";
import {
	OBJECT_FIT_ATTRIBUTE_NAMES, OBJECT_FIT_PROPERTY_NAME,
	OBJECT_POSITION_ATTRIBUTE_NAMES, OBJECT_POSITION_PROPERTY_NAME, REPURPOSED_CSS_PROPERTY_NAME,
	SYMBOL_COMPUTED_STYLE_OBSERVER,
	SYMBOL_MUTATION_OBSERVER,
	SYMBOL_RESIZE_EVENT_LISTENER
} from "../constant/constant";
import {debounce} from "../util/util";
import {ComputedStyleObserver} from "../lib/computed-style-observer/computed-style-observer";

export function observe(selector: string, fixer: ((target: ExtendedHTMLImageElement) => void) | ((target: ExtendedHTMLVideoElement) => void)): void {
	const debouncedFixer = (target: ExtendedHTMLImageElement & ExtendedHTMLVideoElement) => debounce(() => fixer(target), 100, target);

	// Observe the DOM for new <img /> elements
	const connectionObserver = new ConnectionObserver(entries => {
		for (const {connected, target} of entries as {connected: boolean; target: ExtendedHTMLImageElement & ExtendedHTMLVideoElement}[]) {
			const currentMutationObserver = target[SYMBOL_MUTATION_OBSERVER];
			const currentComputedStyleObserver = target[SYMBOL_COMPUTED_STYLE_OBSERVER];
			const currentResizeEventListener = target[SYMBOL_RESIZE_EVENT_LISTENER];

			// If the node was connected and haven't been patched before, apply the patch
			if (!connected) {
				if (currentMutationObserver != null) {
					currentMutationObserver.disconnect();
					target[SYMBOL_MUTATION_OBSERVER] = undefined;
				}

				if (currentResizeEventListener != null) {
					currentResizeEventListener.disconnect();
				}

				if (currentComputedStyleObserver != null) {
					currentComputedStyleObserver.disconnect();
				}
			}
			if (connected) {
				debouncedFixer(target);

				if (currentMutationObserver == null) {
					// Hook up a MutationObserver that observes the relevant attributes for changes
					// that will require reapplying fixes
					const mutationObserver = new MutationObserver(entries => {
						for (const entry of entries) {
							if (entry.attributeName == null) continue;

							// If at least one attribute received a new value that it didn't have previously, fix the image again
							if (entry.oldValue !== target.getAttribute(entry.attributeName)) {
								debouncedFixer(target);
								break;
							}
						}
					});

					mutationObserver.observe(target, {
						attributes: true,
						attributeOldValue: true,
						attributeFilter: [
							// The 'src' may change
							"src",
							"srcset",
							...OBJECT_FIT_ATTRIBUTE_NAMES,
							...OBJECT_POSITION_ATTRIBUTE_NAMES
						]
					});

					// Set the patched symbol
					target[SYMBOL_MUTATION_OBSERVER] = mutationObserver;
				}

				if (currentResizeEventListener == null) {
					// Hook up a listener for resize events as these may require recalculation of styles for the target element
					const listener = () => debouncedFixer(target);
					addEventListener("resize", listener);
					target[SYMBOL_RESIZE_EVENT_LISTENER] = {
						disconnect: () => removeEventListener("resize", listener)
					};
				}

				if (currentComputedStyleObserver == null) {
					// Hook up a listener for changes to computed styles as these should trigger recalculation
					const computedStyleObserver = new ComputedStyleObserver(entries => {
						if (entries.length < 1) return;
						debouncedFixer(target);
					});
					computedStyleObserver.observe(target, {
						propertyNames: [
							OBJECT_FIT_PROPERTY_NAME,
							OBJECT_POSITION_PROPERTY_NAME,
							REPURPOSED_CSS_PROPERTY_NAME
						]
					});

					target[SYMBOL_COMPUTED_STYLE_OBSERVER] = computedStyleObserver;
				}
			}
		}
	});
	connectionObserver.observe(selector);
}
