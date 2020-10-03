import {ToObject} from "../../abstract-operation/to-object";
import {ArraySpeciesCreate} from "../../abstract-operation/array-species-create";
import {FlattenIntoArray} from "../../abstract-operation/flatten-into-array";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {IsCallable} from "../../abstract-operation/is-callable";
import {errorFormatArgument} from "../../util/error-format-argument";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.flatmap
 */
export const {flatMap: arrayPrototypeFlatMap} = {
	flatMap<TT, This = undefined>(this: TT[][], mapperFunction: (this: This, value: TT, index: number, array: TT[]) => TT | readonly TT[]): TT[] {
		const thisArg = arguments.length < 2 ? undefined : arguments[1];
		const thisArgPresent = arguments.length >= 2;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let sourceLen be ? LengthOfArrayLike(O).
		const sourceLen = LengthOfArrayLike(O);

		// If ! IsCallable(mapperFunction) is false, throw a TypeError exception.
		if (!IsCallable(mapperFunction)) {
			throw new TypeError(`${errorFormatArgument(mapperFunction)} is not a function`);
		}

		// If thisArg is present, let T be thisArg; else let T be undefined.
		const T = thisArgPresent ? thisArg : undefined;

		// Let A be ? ArraySpeciesCreate(O, 0).
		const A = ArraySpeciesCreate(O, 0);

		// Perform ? FlattenIntoArray(A, O, sourceLen, 0, 1, mapperFunction, T).
		FlattenIntoArray(A, O, sourceLen, 0, 1, mapperFunction, T);

		// Return A.
		return (A as unknown) as TT[];
	}
};
