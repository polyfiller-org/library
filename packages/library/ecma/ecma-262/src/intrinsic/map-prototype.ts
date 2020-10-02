import {Realm} from "../environment/realm/realm";

export function $MapPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Map.prototype;
}
