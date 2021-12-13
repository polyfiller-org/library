export function constructDomException(message?: string, name?: string): DOMException | TypeError {
	try {
		return new DOMException(message, name);
	} catch {
		return new TypeError(message ?? name);
	}
}
