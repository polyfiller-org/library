import {Realm} from "../environment/realm/realm";

export function $SetPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Set.prototype;
}
