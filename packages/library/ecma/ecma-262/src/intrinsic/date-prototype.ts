import {Realm} from "../environment/realm/realm";

export function $DatePrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Date.prototype;
}
