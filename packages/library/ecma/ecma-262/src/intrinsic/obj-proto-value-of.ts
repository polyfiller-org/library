import {Realm} from "../environment/realm/realm";

export function $ObjProto_valueOf$(realm: Realm) {
	return realm["[[GlobalObject]]"].Object.prototype.valueOf;
}
