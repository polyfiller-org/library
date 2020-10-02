/**
 * https://tc39.es/ecma262/#trailing-surrogate
 * @param {number} codeUnit
 * @returns {boolean}
 */
export function isTrailingSurrogate(codeUnit: number): boolean {
	return codeUnit >= 0xdc00 && codeUnit <= 0xdfff;
}
