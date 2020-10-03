import {
	SYMBOL_EVENT_LISTENER,
	SYMBOL_FORCE_APPLY_OBJECT_FIT_POLYFILL,
	SYMBOL_WRAPPER_CLIENT_HEIGHT,
	SYMBOL_WRAPPER_CLIENT_WIDTH,
	SYMBOL_MUTATION_OBSERVER,
	SYMBOL_OBJECT_FIT,
	SYMBOL_OBJECT_POSITION,
	SYMBOL_OVERRIDDEN_STYLE_PROPERTIES,
	SYMBOL_RESIZE_EVENT_LISTENER,
	SYMBOL_SRC,
	SYMBOL_WRAPPER,
	WRAPPABLE_STYLE_PROPERTIES,
	SYMBOL_NATURAL_WIDTH,
	SYMBOL_NATURAL_HEIGHT,
	SYMBOL_COMPUTED_STYLE_OBSERVER
} from "../constant/constant";

export type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down" | "unset" | "initial" | "inherit";

export type CSSStyleDeclarationView = Omit<CSSStyleDeclaration, "getPropertyValue" | "getPropertyPriority" | "item" | "removeProperty" | "setProperty" | "parentRule" | "length">;
export type CSSStyleDeclarationKey = keyof CSSStyleDeclarationView & string;
export type CSSStyleDeclarationValue<T extends CSSStyleDeclarationKey> = CSSStyleDeclarationView[T];
export type PartialStyles = {[Key in keyof CSSStyleDeclarationView]?: CSSStyleDeclarationView[Key] | null};
export type WrappableStyles = {[Key in keyof typeof WRAPPABLE_STYLE_PROPERTIES]?: CSSStyleDeclarationView[Key] | null};

export interface Disconnectable {
	disconnect(): void;
}

export interface ExtendedMediaElementMixin {
	[SYMBOL_SRC]?: string;
	[SYMBOL_WRAPPER_CLIENT_WIDTH]?: number;
	[SYMBOL_WRAPPER_CLIENT_HEIGHT]?: number;
	[SYMBOL_OBJECT_FIT]?: string;
	[SYMBOL_OBJECT_POSITION]?: string;
	[SYMBOL_WRAPPER]?: HTMLElement;
	[SYMBOL_OVERRIDDEN_STYLE_PROPERTIES]?: PartialStyles;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[SYMBOL_EVENT_LISTENER]?: (this: HTMLVideoElement, ev: HTMLMediaElementEventMap[keyof HTMLMediaElementEventMap]) => any;
	[SYMBOL_RESIZE_EVENT_LISTENER]?: Disconnectable;
	[SYMBOL_MUTATION_OBSERVER]?: Disconnectable;
	[SYMBOL_COMPUTED_STYLE_OBSERVER]?: Disconnectable;
}

export interface ExtendedHTMLImageElement extends HTMLImageElement, ExtendedMediaElementMixin {
	[SYMBOL_NATURAL_WIDTH]?: number;
	[SYMBOL_NATURAL_HEIGHT]?: number;
}

export interface ExtendedHTMLVideoElement extends HTMLVideoElement, ExtendedMediaElementMixin {}

export interface ObjectPosition {
	x: string;
	y: string;
}

declare global {
	interface Window {
		[SYMBOL_FORCE_APPLY_OBJECT_FIT_POLYFILL]?: boolean;
	}
}
