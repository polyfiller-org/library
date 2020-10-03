import {Type} from "./type";
import {GetMethod} from "./get-method";
import {Call} from "./call";
import {OrdinaryToPrimitive, PrimitiveType} from "./ordinary-to-primitive";
import {makeList} from "../lib/list/list";

/**
 * The abstract operation ToPrimitive takes an input argument and an optional argument PreferredType.
 * The abstract operation ToPrimitive converts its input argument to a non-Object type.
 * If an object is capable of converting to more than one primitive type, it may use the optional hint PreferredType to favour that type.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-toprimitive
 */
export function ToPrimitive<T extends PrimitiveType, PreferredType>(input: T, preferredType?: PreferredType): T;
export function ToPrimitive<T>(input: T, preferredType: undefined): undefined;
export function ToPrimitive<T>(input: T, preferredType: string): string;
export function ToPrimitive<T>(input: T, preferredType: number): number;
export function ToPrimitive<T>(input: T): PrimitiveType;
export function ToPrimitive<T>(input: T, preferredType?: PrimitiveType): PrimitiveType {
	let hint: "default" | "string" | "number" | undefined;
	// If Type(input) is Object, then
	if (Type(input) === "Object") {
		// If PreferredType is not present, let hint be "default".
		if (preferredType === undefined) {
			hint = "default";
		}

		// Else if PreferredType is hint String, let hint be "string".
		else if (typeof preferredType === "string") {
			hint = "string";
		}

		// Else PreferredType is hint Number, let hint be "number".
		else if (typeof preferredType === "number") {
			hint = "number";
		}

		// Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
		const exoticToPrim = (GetMethod(input, Symbol.toPrimitive as never) as unknown) as (hint: unknown) => PrimitiveType;
		// If exoticToPrim is not undefined, then
		if (exoticToPrim !== undefined) {
			// Let result be ? Call(exoticToPrim, input, « hint »).
			const result = Call(exoticToPrim, input, makeList(hint));
			// If Type(result) is not Object, return result.
			if (Type(result) !== "Object") {
				return result;
			}

			// Throw a TypeError exception.
			throw new TypeError(`Could not convert ${String(result)} to a primitive value`);
		}

		// If hint is "default", set hint to "number".
		if (hint === "default") {
			hint = "number";
		}

		// Return ? OrdinaryToPrimitive(input, hint).
		return OrdinaryToPrimitive(input as {valueOf: Function; toString: Function}, hint);
	}

	// Return input.
	return (input as unknown) as PrimitiveType;
}
