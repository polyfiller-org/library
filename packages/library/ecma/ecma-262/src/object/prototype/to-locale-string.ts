import {Invoke} from "../../abstract-operation/invoke";

/**
 * https://tc39.es/ecma262/#sec-object.prototype.tolocalestring
 */
export const {toLocaleString: objectPrototypeToLocaleString} = {
	toLocaleString<T extends {toString(): string}>(this: T): string {
		// Let O be the this value.
		const O = this;

		// Return ? Invoke(O, "toString").
		return Invoke(O, "toString");
	}
};
