import {Realm} from "@polyfiller/ecma-262";

export function $Locale$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.Locale;
}
