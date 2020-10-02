import {Realm} from "../environment/realm/realm";

export function $PromiseProto_then$(realm: Realm) {
	return realm["[[GlobalObject]]"].Promise.prototype.then;
}
