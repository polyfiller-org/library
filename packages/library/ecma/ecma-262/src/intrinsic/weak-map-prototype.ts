import {Realm} from "../environment/realm/realm";

export function $WeakMapPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].WeakMap.prototype;
}
