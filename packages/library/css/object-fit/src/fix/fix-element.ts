import {
	assignFreshInlineStyles,
	getObjectFit,
	getObjectPosition,
	getStyleProperties,
	getWrappableStyles,
	parseObjectPosition,
	setNonOverriddenWrappableStyles,
	setStyleProperties
} from "../util/util";
import {
	DEFAULT_OBJECT_POSITION,
	RELEVANT_STYLE_PROPERTIES,
	SKIP_OBJECT_FIT_POLYFILL_ATTRIBUTE_NAME,
	SYMBOL_EVENT_LISTENER,
	SYMBOL_OBJECT_FIT,
	SYMBOL_OBJECT_POSITION,
	SYMBOL_OVERRIDDEN_STYLE_PROPERTIES,
	SYMBOL_SRC,
	SYMBOL_WRAPPER,
	SYMBOL_WRAPPER_CLIENT_HEIGHT,
	SYMBOL_WRAPPER_CLIENT_WIDTH,
	TRANSFORM_PROPERTY_NAME
} from "../constant/constant";
import {SUPPORTS_OBJECT_POSITION} from "../support/supports-object-position";
import {ExtendedHTMLImageElement, ExtendedHTMLVideoElement, ObjectFit} from "../type/type";

export interface FixElementOptions {
	kind: "image" | "video";
	target: ExtendedHTMLImageElement | ExtendedHTMLVideoElement;
	isSupported: boolean;
	loadEvent: string;
	isLoaded: () => boolean;
	getNaturalSize(): {naturalWidth: number; naturalHeight: number};
}

export function fixElement({target, isLoaded, isSupported, loadEvent, getNaturalSize, kind}: FixElementOptions): void {
	if (target.hasAttribute(SKIP_OBJECT_FIT_POLYFILL_ATTRIBUTE_NAME)) return;

	const objectFit = getObjectFit(target);

	// Only consider elements with 'object-fit'
	if (objectFit == null) return;

	let objectPosition = getObjectPosition(target);

	// If the browser supports object-fit but doesn't support object-position and no specific object-position
	// is requested, do no more.
	if (isSupported && !SUPPORTS_OBJECT_POSITION && objectPosition == null) {
		return;
	}

	// Fall back to the default object position if it wasn't provided by the user
	objectPosition ??= `${DEFAULT_OBJECT_POSITION.x} ${DEFAULT_OBJECT_POSITION.y}`;
	const parsedObjectPosition = parseObjectPosition(objectPosition);

	// Create a wrapper element if there isn't one already
	const existingWrapper = target[SYMBOL_WRAPPER];
	const wrapper = existingWrapper ?? document.createElement("div");
	const src = target.currentSrc;

	// Check if a listener has been hooked up before for the metadata event
	const existingEventListener = target[SYMBOL_EVENT_LISTENER];
	if (existingEventListener != null) {
		target.removeEventListener(loadEvent, existingEventListener);
	}

	// If the video is ready to play back, fix it immediately
	if (isLoaded()) {
		rafFixPositioning();
	}

	// Otherwise, hook up a new listener for 'loadedmetadata' events so that
	// we can fix it in the future
	else {
		target.addEventListener(loadEvent, rafFixPositioning);
		target[SYMBOL_EVENT_LISTENER] = rafFixPositioning;
	}

	if (target[SYMBOL_WRAPPER] == null) {
		target[SYMBOL_WRAPPER] = wrapper;

		const parentNode = target.parentNode;
		parentNode?.insertBefore(wrapper, target);
		wrapper.appendChild(target);
	}

	function rafFixPositioning(): void {
		requestAnimationFrame(fixPositioning);
	}

	function fixPositioning(): void {
		const {
			wrappable,
			other: {position}
		} = getWrappableStyles(getStyleProperties(target, RELEVANT_STYLE_PROPERTIES));

		// Pick the overridden styles for the target
		const overriddenStyles = (target[SYMBOL_OVERRIDDEN_STYLE_PROPERTIES] ??= {});

		// Move relevant styles from the target up onto the wrapper
		const updatedWrappedStyleProperties = setNonOverriddenWrappableStyles(wrapper, wrappable, overriddenStyles);
		let {clientWidth: wrapperClientWidth, clientHeight: wrapperClientHeight} = wrapper;

		// If no styles were updated, and if the src matched, then there's nothing else to do here
		if (
			wrapperClientWidth === target[SYMBOL_WRAPPER_CLIENT_WIDTH] &&
			wrapperClientHeight === target[SYMBOL_WRAPPER_CLIENT_HEIGHT] &&
			src === target[SYMBOL_SRC] &&
			objectPosition === target[SYMBOL_OBJECT_POSITION] &&
			objectFit === target[SYMBOL_OBJECT_FIT] &&
			Object.keys(updatedWrappedStyleProperties).length === 0 &&
			position === overriddenStyles.position
		) {
			return;
		}

		// Set default style properties on the wrapper
		setStyleProperties(wrapper, {display: "block", overflow: "hidden"});

		// Set the values on the target such that we can track them later for changes
		target[SYMBOL_SRC] = src;
		target[SYMBOL_OBJECT_FIT] = objectFit;
		target[SYMBOL_OBJECT_POSITION] = objectPosition;
		target[SYMBOL_WRAPPER_CLIENT_WIDTH] = wrapperClientWidth;
		target[SYMBOL_WRAPPER_CLIENT_HEIGHT] = wrapperClientHeight;

		// Override the styles on the target and assign them to the overridden styles record
		// such that we can track it later
		assignFreshInlineStyles(
			overriddenStyles,
			target,
			setStyleProperties(target, {
				maxWidth: "none",
				maxHeight: "none",
				minWidth: "0",
				minHeight: "0",
				border: "none",
				outline: "none",
				padding: "0",
				marginTop: "0",
				marginRight: "0",
				marginBottom: "0",
				marginLeft: "0",
				borderRadius: "none",
				boxShadow: "none"
			})
		);

		// If the position changed
		if (position !== overriddenStyles.position) {
			switch (position) {
				case "absolute":
				case "fixed": {
					setStyleProperties(wrapper, {position});
					assignFreshInlineStyles(overriddenStyles, target, setStyleProperties(target, {position: "relative"}));
					break;
				}

				case "relative":
				case "static": {
					setStyleProperties(wrapper, {
						position: "relative",
						top: null,
						right: null,
						bottom: null,
						left: null
					});
					assignFreshInlineStyles(
						overriddenStyles,
						target,
						setStyleProperties(target, {
							position: "absolute",
							top: "0",
							right: "0",
							bottom: "0",
							left: "0"
						})
					);
					break;
				}
			}

			// Recalculate wrapper client width/height
			({clientWidth: wrapperClientWidth, clientHeight: wrapperClientHeight} = wrapper);
			target[SYMBOL_WRAPPER_CLIENT_WIDTH] = wrapperClientWidth;
			target[SYMBOL_WRAPPER_CLIENT_HEIGHT] = wrapperClientHeight;
		}

		const {naturalWidth, naturalHeight} = getNaturalSize();
		const targetRatio = naturalWidth / naturalHeight;
		const wrapperRatio = wrapperClientWidth / wrapperClientHeight;
		const ratio = targetRatio / wrapperRatio;
		const flippedRatio = wrapperRatio / targetRatio;
		const normalizedRatio = +ratio.toFixed(2);
		const normalizedFlippedRatio = +flippedRatio.toFixed(2);
		const isVertical = ratio < 1;

		let marginLeft: string | undefined = parsedObjectPosition.x;
		let marginTop: string | undefined = parsedObjectPosition.y;
		let transform: string | null = null;
		let width: string;
		let height: string;

		// Normalize the 'object-fit' value
		let normalizedObjectFit: Exclude<ObjectFit, "scale-down">;
		switch (objectFit) {
			// By default, no 'object-fit' value is treated essentially as 'contain', since HTML5 respects the
			// aspect ratio of videos. For when object-fit is 'unset', it is essentially the same as 'object-fit: fill'
			// in that the aspect ratio will be ignored
			case undefined:
			case "unset":
				normalizedObjectFit = "fill";
				break;

			// For these values, fall back to the browser's default behavior which is essentially 'contain' since HTML5
			case "initial":
			case "inherit":
				normalizedObjectFit = "contain";
				break;

			// The content is sized as if none or contain were specified, whichever would result in a smaller concrete object size.
			case "scale-down":
				normalizedObjectFit = naturalWidth > wrapperClientWidth || naturalHeight > wrapperClientHeight ? "contain" : "none";
				break;
			// In all other cases, use the object-fit value as-is
			default:
				normalizedObjectFit = objectFit;
		}

		switch (normalizedObjectFit) {
			case "none": {
				if (parsedObjectPosition.x.endsWith("%")) {
					const xObjectPositionMultiplier = parseFloat(parsedObjectPosition.x) / 100;
					marginLeft = `calc(-1 * (${xObjectPositionMultiplier * (naturalWidth - wrapperClientWidth)}px))`;
				}

				if (parsedObjectPosition.y.endsWith("%")) {
					const yObjectPositionMultiplier = parseFloat(parsedObjectPosition.y) / 100;
					marginTop = `calc(-1 * (${yObjectPositionMultiplier * (naturalHeight - wrapperClientHeight)}px))`;
				}

				assignFreshInlineStyles(
					overriddenStyles,
					target,
					setStyleProperties(target, {
						marginLeft,
						marginTop,
						width: `${naturalWidth}px`,
						height: `${naturalHeight}px`,
						[TRANSFORM_PROPERTY_NAME]: transform
					})
				);

				break;
			}

			case "fill": {
				// Fill does not accept percentage values for object-position
				if (parsedObjectPosition.x.endsWith("%")) {
					marginLeft = undefined;
				}

				if (parsedObjectPosition.y.endsWith("%")) {
					marginTop = undefined;
				}

				if (isVertical) {
					transform =
						kind === "video"
							? // For HTML5 videos, the original aspect ratio will be retained, so we can ignore this by scaling in the x-axis
							  `scaleX(${wrapperRatio / targetRatio})`
							: // For images, we don't have to apply any further transformations
							  "none";
					assignFreshInlineStyles(
						overriddenStyles,
						target,
						setStyleProperties(target, {
							width: "100%",
							height: "100%",
							[TRANSFORM_PROPERTY_NAME]: transform,
							...(marginLeft == null ? {} : {marginLeft}),
							...(marginTop == null ? {} : {marginTop})
						})
					);
				} else {
					transform =
						kind === "video"
							? // For HTML5 videos, the original aspect ratio will be retained, so we can ignore this by scaling in the y-axis
							  `scaleY(${targetRatio / wrapperRatio})`
							: // For images, we don't have to apply any further transformations
							  "none";
					assignFreshInlineStyles(
						overriddenStyles,
						target,
						setStyleProperties(target, {
							width: "100%",
							height: "100%",
							[TRANSFORM_PROPERTY_NAME]: transform,
							...(marginLeft == null ? {} : {marginLeft}),
							...(marginTop == null ? {} : {marginTop})
						})
					);
				}
				break;
			}

			case "cover": {
				if (isVertical) {
					if (parsedObjectPosition.y.endsWith("%")) {
						marginLeft = undefined;
						marginTop = `calc((1 - ${normalizedFlippedRatio}) * ((${parseFloat(parsedObjectPosition.y) / 100} * ${wrapperClientHeight}px)))`;
					}

					assignFreshInlineStyles(
						overriddenStyles,
						target,
						setStyleProperties(target, {
							width: "auto",
							height: `${Math.round(normalizedFlippedRatio * 100)}%`,
							[TRANSFORM_PROPERTY_NAME]: transform,
							...(marginLeft == null ? {} : {marginLeft}),
							...(marginTop == null ? {} : {marginTop})
						})
					);
				} else {
					if (parsedObjectPosition.x.endsWith("%")) {
						marginLeft = `calc(-1 * ((${normalizedRatio} - 1) * ${parsedObjectPosition.x}))`;
						marginTop = undefined;
					}

					assignFreshInlineStyles(
						overriddenStyles,
						target,
						setStyleProperties(target, {
							width: `${Math.round(normalizedRatio * 100)}%`,
							height: "auto",
							[TRANSFORM_PROPERTY_NAME]: transform,
							...(marginLeft == null ? {} : {marginLeft}),
							...(marginTop == null ? {} : {marginTop})
						})
					);
				}
				break;
			}

			case "contain": {
				if (isVertical) {
					if (parsedObjectPosition.x.endsWith("%")) {
						if (kind === "video") {
							// Subtract 50% for videos since these are rendered equivalent to object-fit: contain by the browser already and
							// will default to being centered
							marginLeft = `calc((1 - ${normalizedRatio}) * (${parsedObjectPosition.x} - 50%))`;
						} else {
							// Don't subtract 50% for images since these are rendered equivalent to object-fit: fill by the browser already
							marginLeft = `calc((1 - ${normalizedRatio}) * (${parsedObjectPosition.x}))`;
						}
						if (parsedObjectPosition.y.endsWith("%")) {
							marginTop = undefined;
						}
					} else {
						if (kind === "video") {
							// Multiply by -50% for videos since these are rendered equivalent to object-fit: contain by the browser already and
							// will default to being centered
							marginLeft = `calc((1 - ${normalizedRatio}) * -50% + ${parsedObjectPosition.x})`;
						} else {
							// Don't multiply by -50% for images since these are rendered equivalent to object-fit: fill by the browser already
							marginLeft = `calc((1 - ${normalizedRatio}) + ${parsedObjectPosition.x})`;
						}
						if (parsedObjectPosition.y.endsWith("%")) {
							marginTop = undefined;
						}
					}

					// For video elements, 100% width and 100% height is essentially object-fit: contain
					if (kind === "video") {
						width = `100%`;
						height = `100%`;
					}

					// For image elements, 100% width and 100% height is essentially object-fit: fill,
					// so we'll have to adjust for the aspect ratio
					else {
						height = "100%";
						width = `calc(100% / ${flippedRatio})`;
					}

					assignFreshInlineStyles(
						overriddenStyles,
						target,
						setStyleProperties(target, {
							width,
							height,
							[TRANSFORM_PROPERTY_NAME]: transform,
							...(marginLeft == null ? {} : {marginLeft}),
							...(marginTop == null ? {} : {marginTop})
						})
					);
				} else {
					if (parsedObjectPosition.y.endsWith("%")) {
						if (parsedObjectPosition.x.endsWith("%")) {
							marginLeft = undefined;
						}

						// Videos are rendered equivalently to object-fit: contain, so we'll have to subtract half the wrapper client height
						if (kind === "video") {
							marginTop = `calc((1 - ${normalizedFlippedRatio}) * ((${parseFloat(parsedObjectPosition.y) / 100} * ${wrapperClientHeight}px) - ${wrapperClientHeight / 2}px))`;
						} else {
							marginTop = `calc((1 - ${normalizedFlippedRatio}) * ((${parseFloat(parsedObjectPosition.y) / 100} * ${wrapperClientHeight}px)))`;
						}
					} else {
						marginTop = `calc((1 - ${normalizedFlippedRatio}) * -${wrapperClientHeight / 2}px + ${parsedObjectPosition.y})`;
						if (parsedObjectPosition.x.endsWith("%")) {
							marginLeft = undefined;
						}
					}

					// For video elements, 100% width and 100% height is essentially object-fit: contain
					if (kind === "video") {
						width = `100%`;
						height = `100%`;
					}

					// For image elements, 100% width and 100% height is essentially object-fit: fill,
					// so we'll have to adjust for the aspect ratio
					else {
						height = `calc(100% / ${ratio})`;
						width = `100%`;
					}

					assignFreshInlineStyles(
						overriddenStyles,
						target,
						setStyleProperties(target, {
							width,
							height,
							[TRANSFORM_PROPERTY_NAME]: transform,
							...(marginLeft == null ? {} : {marginLeft}),
							...(marginTop == null ? {} : {marginTop})
						})
					);
				}
				break;
			}
		}
	}
}
