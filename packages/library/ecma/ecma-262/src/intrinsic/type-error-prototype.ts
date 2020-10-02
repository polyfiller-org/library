import {Realm} from "../environment/realm/realm";

export function $TypeErrorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].TypeError.prototype;
}
