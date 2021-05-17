import {Realm} from "@polyfiller/ecma-262";

export function $DateTimeFormatPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.DateTimeFormat.prototype;
}
