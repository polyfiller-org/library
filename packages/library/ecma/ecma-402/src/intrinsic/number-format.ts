import {Realm} from "@polyfiller/ecma-262";

export function $NumberFormat$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.NumberFormat;
}
