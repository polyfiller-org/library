import {CSSStyleDeclarationKey} from "../../type/type";

export interface ComputedStyleObserverInit {
	propertyNames: CSSStyleDeclarationKey[];
	strategy?: "performance"|"precision"|number;
}