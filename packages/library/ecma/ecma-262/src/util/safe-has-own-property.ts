export function safeHasOwnProperty<T>(object: T, key: PropertyKey): boolean {
	return Object.prototype.hasOwnProperty.call(object, key);
}
