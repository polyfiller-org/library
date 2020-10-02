import {__GetPrototypeOf__} from "../internal-slot/object/get-prototype-of";
import {Realm} from "../environment/realm/realm";

export function $AsyncGeneratorPrototype$(realm: Realm) {
	const asyncGenerator = realm["[[GlobalObject]]"].Function("return async function*() {}")();
	return (__GetPrototypeOf__.call(asyncGenerator) as {prototype: object}).prototype;
}
