import {ExtendedHTMLImageElement, ExtendedHTMLVideoElement} from "../type/type";
import {debounce} from "../util/util";

export function debouncedFixer(target: ExtendedHTMLImageElement, fixer: (target: ExtendedHTMLImageElement) => void): void;
export function debouncedFixer(target: ExtendedHTMLVideoElement, fixer: (target: ExtendedHTMLVideoElement) => void): void;
export function debouncedFixer(
	target: ExtendedHTMLImageElement | ExtendedHTMLVideoElement,
	fixer: ((target: ExtendedHTMLImageElement) => void) | ((target: ExtendedHTMLVideoElement) => void)
): void {
	debounce(() => fixer(target as ExtendedHTMLImageElement & ExtendedHTMLVideoElement), 100, target);
}
