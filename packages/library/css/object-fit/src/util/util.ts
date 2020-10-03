import {isInKebabCase, kebabCase} from "@wessberg/stringutil";
import {
	DEFAULT_OBJECT_POSITION,
	OBJECT_FIT_ATTRIBUTE_NAMES,
	OBJECT_FIT_PROPERTY_NAME,
	OBJECT_POSITION_ATTRIBUTE_NAMES,
	OBJECT_POSITION_PROPERTY_NAME,
	REPURPOSED_CSS_PROPERTY_NAME,
	WRAPPABLE_STYLE_PROPERTIES
} from "../constant/constant";
import {CSSStyleDeclarationKey, CSSStyleDeclarationView, ObjectFit, ObjectPosition, PartialStyles, WrappableStyles} from "../type/type";
import {ObjectPositionParser, TokenKind} from "../lib/object-position-parser";

/**
 * A Map between callback functions and their timeout ids.
 */
const DEBOUNCED_CALLBACKS: Map<unknown, number> = new Map();

/**
 * Debounces the execution of the given callback for the given amount of ms
 */
export function debounce<T extends CallableFunction>(callback: T, ms = 16, id?: unknown): number {
	const key = id != null ? id : callback;
	const existingTimeoutId = DEBOUNCED_CALLBACKS.get(key);

	if (existingTimeoutId != null) {
		clearTimeout(existingTimeoutId);
	}

	const timeout = (setTimeout(() => {
		callback();
		DEBOUNCED_CALLBACKS.delete(key);
	}, ms) as unknown) as number;

	DEBOUNCED_CALLBACKS.set(key, timeout);
	return timeout;
}

export interface GetPropertyValueOptions<T extends CSSStyleDeclarationKey> {
	target: Element | HTMLElement;
	propertyName: T;
	attributeNames?: readonly string[];
	repurposedCssProperty?: CSSStyleDeclarationKey;
	computedStyle?: CSSStyleDeclaration;
}

function getPropertyValueFromSemicolonSeparatedKeyValuePairs<T extends CSSStyleDeclarationKey>(input: string, propertyName: T): CSSStyleDeclarationView[T] | undefined {
	const kebabCased = isInKebabCase(propertyName) ? propertyName : kebabCase(propertyName);
	const propertyValueRegexp = new RegExp(`${kebabCased}:\\s*([^;"'\`]*)`);

	if (input.includes(kebabCased)) {
		const match = input.match(propertyValueRegexp);

		if (match != null) {
			const [, propertyValue] = match;
			if (propertyValue != null && propertyValue !== "") {
				return propertyValue as CSSStyleDeclarationView[T];
			}
		}
	}
	return undefined;
}

export function getPropertyValue<T extends CSSStyleDeclarationKey>(options: GetPropertyValueOptions<T>): CSSStyleDeclarationView[T] | undefined {
	const {target, attributeNames, propertyName, repurposedCssProperty} = options;
	let {computedStyle} = options;
	let value: CSSStyleDeclarationView[T] | undefined;

	if (attributeNames != null) {
		for (const attributeName of attributeNames) {
			const attributeValue = target.getAttribute(attributeName);
			if (attributeValue != null && attributeValue !== "") {
				value = attributeValue;
				if (value != null) break;
			}
		}
	}

	if (value == null && "style" in target) {
		// Check if the property exists on the CSSStyleDeclaration
		const propertyValue = target.style[propertyName];
		// Return it if it is given and has a proper value
		if (propertyValue != null && propertyValue !== "") {
			value = propertyValue;
		}
	}

	if (value == null) {
		// Otherwise, check if it is set as an inline style
		value = getPropertyValueFromSemicolonSeparatedKeyValuePairs(target.getAttribute("style") ?? "", propertyName);
	}

	if (value == null && repurposedCssProperty != null) {
		// Otherwise, check if it is given as part of another, repurposed CSS property
		const repurposedCssPropertyValue = getPropertyValue({target, propertyName: repurposedCssProperty});
		if (repurposedCssPropertyValue != null) {
			value = getPropertyValueFromSemicolonSeparatedKeyValuePairs(repurposedCssPropertyValue, propertyName);
		}
	}

	if (value == null) {
		// Take the computed style for the element and see if it contains a specific value for the property
		if (computedStyle == null) {
			computedStyle = getComputedStyle(target);
		}
		const computedStyleValue = computedStyle[propertyName];
		if (computedStyleValue != null && computedStyleValue !== "") {
			value = computedStyleValue;
		}
	}

	// In all other cases, use the value from the CSSOM
	return value;
}

export function getStyleProperties<T extends {[Key in keyof CSSStyleDeclarationView]?: boolean}>(
	target: HTMLElement,
	keys: T,
	computedStyle: CSSStyleDeclaration = getComputedStyle(target)
): {[Key in keyof T]: string | null | undefined} {
	const record = {} as {[Key in keyof T]: string | null | undefined};
	for (const key in keys) {
		if (!Object.prototype.hasOwnProperty.call(keys, key)) continue;
		if (!Boolean(keys[key])) continue;

		record[key] = getPropertyValue({target, propertyName: key as CSSStyleDeclarationKey, computedStyle});
	}

	return record;
}

export function setStyleProperties<T extends PartialStyles>(target: HTMLElement, properties: T): T {
	for (const key in properties) {
		if (!Object.prototype.hasOwnProperty.call(properties, key)) continue;
		const value = properties[key];

		// Only set the value if it changed
		if (target.style[key] === value) continue;

		target.style[key] = value as string;
	}
	return properties;
}

export function onHasNaturalWidth(target: HTMLImageElement, callback: () => void) {
	if ("naturalWidth" in target && target.naturalWidth != null && target.naturalWidth > 0) {
		callback();
	} else {
		setTimeout(() => onHasNaturalWidth(target, callback), 100);
	}
}

export function parseObjectPosition(text: string): ObjectPosition {
	const result: Partial<ObjectPosition> = {
		x: undefined,
		y: undefined
	};

	const lexer = new ObjectPositionParser(text);
	let axis: keyof ObjectPosition = "x";

	while (true) {
		const token = lexer.lex();

		// No matter the token, first check if need to update the axis
		if (axis === "x") {
			if (result.x != null) {
				axis = "y";
			}
		}

		// If we already have a value for y, we can break immediately
		else if (axis === "y") {
			if (result.y != null) {
				break;
			}
		}

		// If we reached the end, or if there is at least one bad character in the input, break parsing immediately
		if (token.kind === TokenKind.END_OF_FILE_TOKEN || token.kind === TokenKind.BAD_CHARACTER_TOKEN) {
			break;
		} else if (token.kind === TokenKind.POSITION_LITERAL_TOKEN) {
			switch (token.value) {
				case "left":
				case "top":
					result[axis] = "0%";
					break;
				case "center":
					result[axis] = "50%";
					break;
				case "right":
				case "bottom":
					result[axis] = "100%";
					break;

				default:
					// If the object position is any other kind of value, fall back to the default position
					return DEFAULT_OBJECT_POSITION;
			}
		} else if (token.kind === TokenKind.NUMBER_WITH_UNIT_TOKEN) {
			result[axis] = token.value;
		}
	}

	// Ensure that the result has values for both x and y
	result.x ??= DEFAULT_OBJECT_POSITION.x;
	result.y ??= result.x;

	return result as ObjectPosition;
}

export function getWrappableStyles(styles: PartialStyles): {wrappable: WrappableStyles; other: PartialStyles} {
	const wrappable = {} as WrappableStyles;
	const other = {} as PartialStyles;

	for (const key in styles) {
		const castKey = key as CSSStyleDeclarationKey;
		if (Object.prototype.hasOwnProperty.call(WRAPPABLE_STYLE_PROPERTIES, key)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(wrappable as any)[castKey] = styles[castKey];
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(other as any)[castKey] = styles[castKey];
		}
	}
	return {wrappable, other};
}

export function setNonOverriddenWrappableStyles<T extends WrappableStyles, U extends WrappableStyles>(on: HTMLElement, styles: T, overrides: U): Partial<T> {
	const filteredStyles = {} as T;
	for (const key in styles) {
		if (!Object.prototype.hasOwnProperty.call(styles, key)) continue;

		const castKey = key as keyof typeof WRAPPABLE_STYLE_PROPERTIES;
		const value = styles[castKey];

		// If the new value is identical to the wrapped value, don't set it
		if (Object.prototype.hasOwnProperty.call(overrides, key) && value === overrides[castKey]) continue;

		// Skip the value if it didn't change
		if (on.style[castKey] === value) continue;

		filteredStyles[key] = styles[key];
	}

	setStyleProperties(on, filteredStyles);
	return filteredStyles;
}

export function assignFreshInlineStyles<T>(obj: T, target: HTMLElement, properties: CSSStyleDeclarationKey[] | PartialStyles): void {
	if (Array.isArray(properties)) {
		for (const key of properties) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(obj as any)[key] = target.style[key];
		}
	} else {
		for (const key in properties) {
			if (!Object.prototype.hasOwnProperty.call(properties, key)) continue;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(obj as any)[key] = target.style[key];
		}
	}
}

export function getObjectFit(target: HTMLElement): ObjectFit | undefined {
	return getPropertyValue({
		target,
		propertyName: OBJECT_FIT_PROPERTY_NAME,
		attributeNames: OBJECT_FIT_ATTRIBUTE_NAMES,
		repurposedCssProperty: REPURPOSED_CSS_PROPERTY_NAME
	}) as ObjectFit | undefined;
}

export function getObjectPosition(target: HTMLElement): string | undefined {
	return getPropertyValue({
		target,
		propertyName: OBJECT_POSITION_PROPERTY_NAME,
		attributeNames: OBJECT_POSITION_ATTRIBUTE_NAMES,
		repurposedCssProperty: REPURPOSED_CSS_PROPERTY_NAME
	});
}

/**
 * Enqueues the given function for the next microtask
 */
export const nextMicrotask = (func: () => void): void => {
	if (typeof queueMicrotask !== "undefined") queueMicrotask(func);
	else if (typeof Promise !== "undefined") Promise.resolve().then(() => func());
	else setTimeout(() => func(), 0);
};

export function findUp<T extends Node = Node>(from: Node, match: (node: Node) => boolean): T | undefined {
	let parentNode = from.parentNode;
	while (parentNode != null) {
		if (match(parentNode)) return (parentNode as unknown) as T;
		parentNode = parentNode.parentNode;
	}
	return undefined;
}
