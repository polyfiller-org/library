import {Realm} from "../environment/realm/realm";

export function $AsyncFunction$(realm: Realm) {
	return realm["[[GlobalObject]]"].Function("return async function() {}.constructor")();
}
