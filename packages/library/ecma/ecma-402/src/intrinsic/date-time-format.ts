import {Realm} from "@polyfiller/ecma-262";

export function $DateTimeFormat$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.DateTimeFormat;
}
