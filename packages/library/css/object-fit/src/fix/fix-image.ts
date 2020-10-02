import {findUp, getObjectFit, getObjectPosition, onHasNaturalWidth} from "../util/util";
import {
	DEFAULT_OBJECT_POSITION,
	EMPTY_IMAGE_SRC,
	SKIP_OBJECT_FIT_POLYFILL_ATTRIBUTE_NAME,
	SYMBOL_NATURAL_HEIGHT,
	SYMBOL_NATURAL_WIDTH,
	SYMBOL_OBJECT_FIT,
	SYMBOL_OBJECT_POSITION,
	SYMBOL_SRC
} from "../constant/constant";
import {SUPPORTS_OBJECT_FIT_FOR_IMAGES} from "../support/supports-object-fit";
import {SUPPORTS_OBJECT_POSITION} from "../support/supports-object-position";
import {ExtendedHTMLImageElement} from "../type/type";
import {fixElement} from "./fix-element";
import {SUPPORTS_BACKGROUND_IMAGE} from "../support/supports-background-image";

function pickImageElementSrc(target: HTMLImageElement): string | undefined {
	// If it has been been patched once before, and the `src` hasn't changed since,
	// the actual src to use comes from the `background-image` CSS property
	if (target.src === EMPTY_IMAGE_SRC) {
		const backgroundImage = target.style.backgroundImage ?? getComputedStyle(target).getPropertyValue("background-image");
		if (backgroundImage.length > 0) {
			return backgroundImage.slice(`url("`.length, -`")`.length);
		}
	}

	return target.currentSrc != null && target.currentSrc.length > 0 ? target.currentSrc : target.src;
}

function hasSrcset(target: HTMLImageElement): boolean {
	return target.srcset != null && target.srcset !== "";
}

export function fixImage(target: ExtendedHTMLImageElement): void {
	// If the element has a srcset, or if it doesn't support 'background-image', or if it is part of a picture element use the common wrapping strategy
	if (hasSrcset(target) || !SUPPORTS_BACKGROUND_IMAGE || findUp(target, node => typeof HTMLPictureElement !== "undefined" && node instanceof HTMLPictureElement) != null) {
		return fixElement({
			target,
			loadEvent: "load",
			kind: "image",
			isSupported: SUPPORTS_OBJECT_FIT_FOR_IMAGES,
			isLoaded: () => target.complete && (target.naturalWidth == null || target.naturalWidth > 0),
			getNaturalSize: () => ({naturalWidth: target.naturalWidth, naturalHeight: target.naturalHeight})
		});
	}

	// Otherwise, proceed with a strategy involving the 'background-image' CSS property
	if (target.hasAttribute(SKIP_OBJECT_FIT_POLYFILL_ATTRIBUTE_NAME)) return;

	const objectFit = getObjectFit(target);

	// Only consider images with object-fit
	if (objectFit == null) return;

	let objectPosition = getObjectPosition(target);

	// If the browser supports object-fit but doesn't support object-position and no specific object-position
	// is requested, do no more.
	if (SUPPORTS_OBJECT_FIT_FOR_IMAGES && !SUPPORTS_OBJECT_POSITION && objectPosition == null) {
		return;
	}

	const src = pickImageElementSrc(target);
	const backgroundImage = `url("${src}")`;

	// Fall back to the default object position if it wasn't provided by the user
	objectPosition ??= `${DEFAULT_OBJECT_POSITION.x} ${DEFAULT_OBJECT_POSITION.y}`;

	// If neither the image nor its object-fit and/or object-position values changed, do no more
	if (backgroundImage === target[SYMBOL_SRC] && objectPosition === target[SYMBOL_OBJECT_POSITION] && objectFit === target[SYMBOL_OBJECT_FIT]) {
		return;
	}

	// Set the values on the target such that we can track them later for changes
	target[SYMBOL_SRC] = backgroundImage;
	target[SYMBOL_OBJECT_FIT] = objectFit;
	target[SYMBOL_OBJECT_POSITION] = objectPosition;

	const srcSetter = () => target.setAttribute("src", EMPTY_IMAGE_SRC);

	// Update the target src to point to an empty image
	if (target.src !== EMPTY_IMAGE_SRC) {
		// Clear the previously computed natural width/height
		target[SYMBOL_NATURAL_WIDTH] = undefined;
		target[SYMBOL_NATURAL_HEIGHT] = undefined;
	}

	// Clear the srcset from the target
	if (hasSrcset(target)) {
		target.srcset = "";
	}

	target.style.backgroundImage = backgroundImage;
	target.style.backgroundPosition = objectPosition;
	target.style.backgroundRepeat = "no-repeat";
	target.style.backgroundOrigin = "content-box";

	const naturalWidthCallback = (naturalWidth: number, naturalHeight: number) => {
		if (objectFit === "scale-down") {
			if (naturalWidth > target.width || naturalHeight > target.height) {
				target.style.backgroundSize = "contain";
			} else {
				target.style.backgroundSize = "auto";
			}
		}

		// It is now safe to update the src
		if (target.src !== EMPTY_IMAGE_SRC) {
			srcSetter();
		}
	};

	const currentNaturalWidth = target[SYMBOL_NATURAL_WIDTH];
	const currentNaturalHeight = target[SYMBOL_NATURAL_HEIGHT];

	if (currentNaturalWidth != null && currentNaturalHeight != null) {
		naturalWidthCallback(currentNaturalWidth, currentNaturalHeight);
	} else {
		onHasNaturalWidth(target, () => {
			target[SYMBOL_NATURAL_WIDTH] = target.naturalWidth;
			target[SYMBOL_NATURAL_HEIGHT] = target.naturalHeight;
			return naturalWidthCallback(target.naturalWidth, target.naturalHeight);
		});
	}

	switch (objectFit) {
		case "scale-down":
			// scale-down is handled directly from the natural width callback
			break;

		case "none": {
			target.style.backgroundSize = "auto";
			break;
		}

		case "fill": {
			target.style.backgroundSize = "100% 100%";
			break;
		}

		default:
			target.style.backgroundSize = objectFit;
			break;
	}
}
