import {Type} from "./type";
import {$PromiseProto_then$} from "../intrinsic/promise-proto-then";
import {InternalPromise} from "../type/internal-promise";
import {getCurrentRealmRecord} from "../environment/realm/get-current-realm-record";

/**
 * The abstract operation IsPromise checks for the promise brand on an object.
 * https://tc39.es/ecma262/#sec-ispromise
 */
export function IsPromise<T>(x: unknown): x is InternalPromise<T> {
	// If Type(x) is not Object, return false.
	if (Type(x) !== "Object") return false;

	// If x does not have a [[PromiseState]] internal slot, return false.
	// (Else) Return true.
	try {
		$PromiseProto_then$(getCurrentRealmRecord()).call(x);
		return true;
	} catch {
		return false;
	}
}
