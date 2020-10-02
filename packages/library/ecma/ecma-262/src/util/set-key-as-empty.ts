export function setKeyAsEmpty<O, K extends keyof O>(obj: O, key: K): void {
	delete obj[key];
}
