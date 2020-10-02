export function keyIsEmpty<O, K extends keyof O>(obj: O, key: K): boolean {
	return !Object.prototype.hasOwnProperty.call(obj, key);
}
