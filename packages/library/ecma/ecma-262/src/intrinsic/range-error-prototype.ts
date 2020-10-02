import {Realm} from "../environment/realm/realm";

export function $RangeErrorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].RangeError.prototype;
}
