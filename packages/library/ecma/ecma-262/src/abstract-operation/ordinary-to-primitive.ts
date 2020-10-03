import {assert, assertType} from "./assert";
import {Type} from "./type";
import {Get} from "./get";
import {IsCallable} from "./is-callable";
import {Call} from "./call";
import {List2, makeList} from "../lib/list/list";

export type PrimitiveType = undefined | null | string | number | boolean | symbol;

/**
 * https://tc39.es/ecma262/#sec-ordinarytoprimitive
 */
export function OrdinaryToPrimitive<TO extends {valueOf: Function; toString: Function}>(O: TO, hint: "default" | "string" | "number" | undefined): PrimitiveType {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Argument at position 0 must be an Object`, TypeError);

	// Assert: Type(hint) is String and its value is either "string" or "number".
	assert(Type(hint) === "String" && (hint === "string" || hint === "number"), `Argument at position 0 must be either the literal value "string" or "number"`, TypeError);

	let methodNames: List2<"toString", "valueOf"> | List2<"valueOf", "toString">;

	// If hint is "string", then
	if (hint === "string") {
		// Let methodNames be « "toString", "valueOf" ».
		methodNames = makeList("toString", "valueOf");
	}

	// Else,
	else {
		// Let methodNames be « "valueOf", "toString" ».
		methodNames = makeList("valueOf", "toString");
	}

	// For each name in methodNames in List order, do
	for (let i = 0; i < methodNames.length; i++) {
		const name = methodNames.get(i);

		// Let method be ? Get(O, name).
		const method = Get(O, name);
		// If IsCallable(method) is true, then
		if (IsCallable(method)) {
			// Let result be ? Call(method, O).
			const result = Call(method, O);
			// If Type(result) is not Object, return result.
			if (Type(result) !== "Object") {
				return result;
			}
		}
	}

	// Throw a TypeError exception.
	throw new TypeError(`Argument at position 0 could not be converted into a primitive value`);
}
