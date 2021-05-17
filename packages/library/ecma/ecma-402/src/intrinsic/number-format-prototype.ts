import {Realm} from "@polyfiller/ecma-262";

export function $NumberFormatPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.NumberFormat.prototype;
}
