import {Realm} from "../environment/realm/realm";

export function $NumberPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Number.prototype;
}
