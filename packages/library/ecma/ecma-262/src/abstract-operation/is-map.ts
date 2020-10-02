export function IsMap<Key, Value>(argument: Map<Key, Value> | unknown): argument is Map<Key, Value> {
	return Object.prototype.toString.call(argument) === "[object Map]";
}
