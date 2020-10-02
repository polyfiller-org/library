import {__GetPrototypeOf__} from "../internal-slot/object/get-prototype-of";
import {Realm} from "../environment/realm/realm";

export function $TypedArrayPrototype$(realm: Realm) {
	return (__GetPrototypeOf__.call(realm["[[GlobalObject]]"].Uint8Array) as {prototype: unknown}).prototype as {};
}
