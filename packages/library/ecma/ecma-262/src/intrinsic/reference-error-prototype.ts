import {Realm} from "../environment/realm/realm";

export function $ReferenceErrorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].ReferenceError.prototype;
}
