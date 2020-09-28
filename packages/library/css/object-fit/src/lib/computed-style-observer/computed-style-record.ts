import {CSSStyleDeclarationKey, CSSStyleDeclarationView} from "../../type/type";

export interface ComputedStylePropertyChange<T extends CSSStyleDeclarationKey> {
	oldValue: CSSStyleDeclarationView[T]|undefined;
	newValue: CSSStyleDeclarationView[T]|undefined;
}

export interface ComputedStyleRecord {
	/**
	 * A representation of active CSS values for the target Element
	 */
	readonly declaration: CSSStyleDeclaration;

	/**
	 * A Record between CSS property names and their new values
	 */
	changes: Map<CSSStyleDeclarationKey, ComputedStylePropertyChange<CSSStyleDeclarationKey>>;

	/**
	 * The target Element
	 */
	readonly target: Element;
}
