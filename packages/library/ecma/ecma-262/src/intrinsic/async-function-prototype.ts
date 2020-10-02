import {Realm} from "../environment/realm/realm";

export function $AsyncFunctionPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Function("return async function() {}.constructor.prototype")();
}
