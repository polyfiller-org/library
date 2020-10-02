import {Realm} from "../environment/realm/realm";

export function $WeakSetPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].WeakSet.prototype;
}
