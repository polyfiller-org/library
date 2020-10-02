import {Realm} from "../environment/realm/realm";

export function $ObjProto_toString$(realm: Realm) {
	return realm["[[GlobalObject]]"].Object.prototype.toString;
}
