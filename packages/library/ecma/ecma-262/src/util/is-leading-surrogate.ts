/**
 * https://tc39.es/ecma262/#leading-surrogate
 * @param {number} codeUnit
 * @returns {boolean}
 */
export function isLeadingSurrogate(codeUnit: number): boolean {
	return codeUnit >= 0xd800 && codeUnit <= 0xdbff;
}
