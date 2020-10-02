import {Realm} from "../environment/realm/realm";

export function $URIErrorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].URIError.prototype;
}
