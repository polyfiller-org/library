export function ensureError<T extends Error = Error>(ex: unknown | T): T {
	if (ex instanceof Error) return ex as T;
	if (ex == null || !(typeof ex === "object")) return new Error() as T;
	if ("message" in ex) return new Error((ex as {message: string}).message) as T;

	return new Error() as T;
}
