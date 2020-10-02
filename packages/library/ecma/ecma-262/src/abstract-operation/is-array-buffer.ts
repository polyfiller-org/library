/**
 */
export function IsArrayBuffer(argument: unknown | ArrayBuffer): argument is ArrayBuffer {
	return typeof ArrayBuffer !== "undefined" && (Object.prototype.toString.call(argument) === "[object ArrayBuffer]" || argument instanceof ArrayBuffer);
}
