import {Realm} from "@polyfiller/ecma-262";

export function $StringProto_indexOf$(realm: Realm) {
	return realm["[[GlobalObject]]"].String.prototype.indexOf;
}
