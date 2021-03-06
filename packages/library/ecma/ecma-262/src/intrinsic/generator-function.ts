import {__GetPrototypeOf__} from "../internal-slot/object/get-prototype-of";
import {Realm} from "../environment/realm/realm";

export function $GeneratorFunction$(realm: Realm) {
	const generatorFunction = realm["[[GlobalObject]]"].Function("return function*() {}")();
	return __GetPrototypeOf__.call(generatorFunction) as typeof Function;
}
