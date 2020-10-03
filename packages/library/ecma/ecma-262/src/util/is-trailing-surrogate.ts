/**
 * https://tc39.es/ecma262/#trailing-surrogate
 */
export function isTrailingSurrogate(codeUnit: number): boolean {
	return codeUnit >= 0xdc00 && codeUnit <= 0xdfff;
}
