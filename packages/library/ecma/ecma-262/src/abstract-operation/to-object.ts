import {Type} from "./type";
import {SymbolObject} from "../symbol/symbol-object";
type ToObjectReturnType = Boolean | Number | String | Symbol | Object | never;

/**
 * The abstract operation ToObject converts argument to a value of type Object.
 *
 * https://tc39.github.io/ecma262/#sec-toobject
 * @returns{ToObjectReturnType}
 */
export function ToObject(argument: boolean | Boolean): Boolean;
export function ToObject(argument: number | Number): Number;
export function ToObject(argument: string | String): String;
export function ToObject(argument: symbol | Symbol): Symbol;
export function ToObject(argument: undefined | null): never;
export function ToObject<T extends object>(argument: T): T;
export function ToObject<T>(argument: T): ToObjectReturnType;
export function ToObject(argument: boolean | Boolean | number | Number | string | String | symbol | Symbol | undefined | null): ToObjectReturnType {
	const type = Type(argument);

	switch (type) {
		case "Undefined":
		case "Null": {
			throw new TypeError(`Argument ${argument as undefined | null} cannot be converted to an Object`);
		}

		case "Boolean":
			return new Boolean(argument);

		case "Number":
			return new Number(argument);

		case "String":
			return new String(argument);

		case "Symbol":
			return SymbolObject(argument as symbol);

		case "Object":
			return argument as Object;
	}
}
