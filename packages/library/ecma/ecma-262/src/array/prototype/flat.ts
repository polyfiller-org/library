import {ToObject} from "../../abstract-operation/to-object";
import {ToLength} from "../../abstract-operation/to-length";
import {Get} from "../../abstract-operation/get";
import {ToInteger} from "../../abstract-operation/to-integer";
import {ArraySpeciesCreate} from "../../abstract-operation/array-species-create";
import {FlattenIntoArray} from "../../abstract-operation/flatten-into-array";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-array.prototype.flat
 */
export const {flat: arrayPrototypeFlat} = {
	flat<T>(this: T[][]): T[] {
		const depth = arguments.length < 1 ? undefined : (arguments[0] as number | undefined);

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let sourceLen be ? ToLength(? Get(O, "length")).
		const sourceLen = ToLength(Get(O, "length"));

		// Let depthNum be 1.
		let depthNum = 1;

		// If depth is not undefined, then
		if (depth !== undefined) {
			// Set depthNum to ? ToInteger(depth).
			depthNum = ToInteger(depth);
		}

		// Let A be ? ArraySpeciesCreate(O, 0).
		const A = ArraySpeciesCreate(O, 0) as unknown as T[];

		// Perform ? FlattenIntoArray(A, O, sourceLen, 0, depthNum).
		FlattenIntoArray(A, O, sourceLen, 0, depthNum);

		// Return A.
		return A;
	}
};
