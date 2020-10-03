import {Type} from "./type";
import {SymbolObject} from "../symbol/symbol-object";
type ToObjectReturnType = boolean | number | string | symbol | Object | never;

/**
 * The abstract operation ToObject converts argument to a value of type Object.
 *
 * https://tc39.github.io/ecma262/#sec-toobject
 */
export function ToObject(argument: boolean): boolean;
export function ToObject(argument: number): number;
export function ToObject(argument: string): string;
export function ToObject(argument: symbol): symbol;
export function ToObject(argument: undefined | null): never;
export function ToObject<T extends object>(argument: T): T;
export function ToObject<T>(argument: T): ToObjectReturnType;
export function ToObject(argument: boolean | number | string | symbol | undefined | null): ToObjectReturnType {
	const type = Type(argument);

	switch (type) {
		case "Undefined":
		case "Null": {
			throw new TypeError(`Argument ${argument as undefined | null} cannot be converted to an Object`);
		}

		case "Boolean":
			// eslint-disable-next-line no-new-wrappers
			return new Boolean(argument);

		case "Number":
			// eslint-disable-next-line no-new-wrappers
			return new Number(argument);

		case "String":
			// eslint-disable-next-line no-new-wrappers
			return new String(argument);

		case "Symbol":
			return SymbolObject(argument as symbol);

		case "Object":
			return argument as Object;
	}
}
