import {Realm} from "../environment/realm/realm";

export function $PromisePrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Promise.prototype;
}
