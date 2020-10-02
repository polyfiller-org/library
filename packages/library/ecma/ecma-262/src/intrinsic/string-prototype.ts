import {Realm} from "../environment/realm/realm";

export function $StringPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].String.prototype;
}
