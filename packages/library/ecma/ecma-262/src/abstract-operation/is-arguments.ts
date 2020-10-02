export function IsArguments(argument: IArguments | unknown): argument is IArguments {
	return Object.prototype.toString.call(argument) === "[object Arguments]";
}
