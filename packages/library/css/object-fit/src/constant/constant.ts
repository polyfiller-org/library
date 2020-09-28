import {ObjectPosition} from "../type/type";

export const OBJECT_FIT_PROPERTY_NAME = "objectFit";
export const OBJECT_POSITION_PROPERTY_NAME = "objectPosition";
export const REPURPOSED_CSS_PROPERTY_NAME = "fontFamily";

export const SKIP_OBJECT_FIT_POLYFILL_ATTRIBUTE_NAME = "data-skip-object-fit-polyfill";

export const OBJECT_FIT_ATTRIBUTE_NAMES = ["object-fit", "data-object-fit"];

export const OBJECT_POSITION_ATTRIBUTE_NAMES = ["object-position", "data-object-position"];

export const DEFAULT_OBJECT_POSITION: ObjectPosition = {
	x: "50%",
	y: "50%"
};
export const EMPTY_IMAGE_SRC = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export const TRANSFORM_PROPERTY_NAME = (() => {
	if ("transform" in document.documentElement.style) return "transform";
	if ("msTransform" in document.documentElement.style) return "msTransform" as "transform";
	if ("webkitTransform" in document.documentElement.style) return "webkitTransform" as "transform";
	return "transform";
})();

export const WRAPPABLE_STYLE_PROPERTIES = {
	[TRANSFORM_PROPERTY_NAME]: true,
	width: true,
	height: true,
	minWidth: true,
	maxWidth: true,
	minHeight: true,
	maxHeight: true,
	border: true,
	outline: true,
	padding: true,
	marginLeft: true,
	marginTop: true,
	marginRight: true,
	marginBottom: true,
	boxShadow: true,
	borderRadius: true,
	top: true,
	left: true,
	right: true,
	bottom: true
} as const;

export const RELEVANT_STYLE_PROPERTIES = {
	...WRAPPABLE_STYLE_PROPERTIES,
	position: true
} as const;

// Symbols
export const SYMBOL_MUTATION_OBSERVER: unique symbol = Symbol("mutationObserver");
export const SYMBOL_RESIZE_EVENT_LISTENER: unique symbol = Symbol("resizeEventListener");
export const SYMBOL_COMPUTED_STYLE_OBSERVER: unique symbol = Symbol("computedStyleObserver");
export const SYMBOL_SRC: unique symbol = Symbol("src");
export const SYMBOL_WRAPPER_CLIENT_WIDTH: unique symbol = Symbol("wrapperClientWidth");
export const SYMBOL_WRAPPER_CLIENT_HEIGHT: unique symbol = Symbol("wrapperClientHeight");
export const SYMBOL_NATURAL_WIDTH: unique symbol = Symbol("naturalWidth");
export const SYMBOL_NATURAL_HEIGHT: unique symbol = Symbol("naturalHeight");
export const SYMBOL_OBJECT_FIT: unique symbol = Symbol("objectFit");
export const SYMBOL_OBJECT_POSITION: unique symbol = Symbol("objectPosition");
export const SYMBOL_WRAPPER: unique symbol = Symbol("wrapper");
export const SYMBOL_EVENT_LISTENER: unique symbol = Symbol("eventListener");
export const SYMBOL_OVERRIDDEN_STYLE_PROPERTIES: unique symbol = Symbol("overriddenStyleProperties");
export const SYMBOL_FORCE_APPLY_OBJECT_FIT_POLYFILL: unique symbol = Symbol.for("forceApplyObjectFitPolyfill");
