import {Realm} from "../environment/realm/realm";

export function $BooleanPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Boolean.prototype;
}
