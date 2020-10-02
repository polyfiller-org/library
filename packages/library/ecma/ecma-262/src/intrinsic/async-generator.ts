import {__GetPrototypeOf__} from "../internal-slot/object/get-prototype-of";
import {Realm} from "../environment/realm/realm";

export function $AsyncGenerator$(realm: Realm) {
	const asyncGeneratorFunction = realm["[[GlobalObject]]"].Function("return async function*() {}")();
	return __GetPrototypeOf__.call(asyncGeneratorFunction()) as {};
}
