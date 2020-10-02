import {Realm} from "../environment/realm/realm";

export function $ErrorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Error.prototype;
}
