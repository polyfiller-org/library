const NATIVE_STRING_PROTOTYPE_SLICE = String.prototype.slice;
const NATIVE_STRING_PROTOTYPE_REPLACE = String.prototype.replace;
const NATIVE_STRING_PROTOTYPE_CHAR_CODE_AT = String.prototype.charCodeAt;

/**
 * Returns a substring.
 * Note: String.prototype.slice is part of ES3 and can therefore be used safely here.
 */
export function substring(string: string, start: number, end?: number): string {
	return NATIVE_STRING_PROTOTYPE_SLICE.call(string, start, end);
}

/**
 * Replaces searchValue with replaceValue in the given string
 * Note: String.prototype.replace (the non-regex variant) is part of ES3 and can therefore be used safely here.
 */
export function replace(string: string, searchValue: string, replaceValue: string): string {
	return NATIVE_STRING_PROTOTYPE_REPLACE.call(string, searchValue as never, replaceValue as never);
}

/**
 * Checks if the given string contains the given value
 */
export function contains(string: string, value: string): boolean {
	for (let i = 0; i < string.length; i++) {
		const current = string[i];
		if (current === value) return true;
	}
	return false;
}

/**
 * Checks if the given string contains the given charCode
 */
export function containsCharCode(string: string, charCode: number): boolean {
	for (let i = 0; i < string.length; i++) {
		if (NATIVE_STRING_PROTOTYPE_CHAR_CODE_AT.call(string, i) === charCode) {
			return true;
		}
	}
	return false;
}
