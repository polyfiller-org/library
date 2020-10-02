import {ToObject} from "../../abstract-operation/to-object";
import {Get} from "../../abstract-operation/get";
import {IsCallable} from "../../abstract-operation/is-callable";
import {getCurrentIntrinsics} from "../../environment/realm/get-current-intrinsics";
import {Call} from "../../abstract-operation/call";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.tostring
 */
export const {toString: arrayPrototypeToString} = {
	toString<T>(this: T[]): string {
		// Let array be ? ToObject(this value).
		const array = ToObject(this);

		// Let func be ? Get(array, "join").
		let func = Get(array, "join");

		// If IsCallable(func) is false, set func to the intrinsic function %Object.prototype.toString%.
		if (IsCallable(func) === false) {
			func = getCurrentIntrinsics()["[[%ObjProto_toString%]]"];
		}

		// Return ? Call(func, array).
		return Call(func, array);
	}
};
