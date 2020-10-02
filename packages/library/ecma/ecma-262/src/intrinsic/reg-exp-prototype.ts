import {Realm} from "../environment/realm/realm";

export function $RegExpPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].RegExp.prototype;
}
