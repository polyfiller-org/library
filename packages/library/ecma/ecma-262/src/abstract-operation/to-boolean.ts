/**
 * The abstract operation ToBoolean converts argument to a value of type Boolean
 * https://tc39.es/ecma262/#sec-toboolean
 */
export function ToBoolean(argument: unknown): boolean {
	return Boolean(argument);
}
