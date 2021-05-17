import {Realm} from "@polyfiller/ecma-262";

export function $RelativeTimeFormat$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.RelativeTimeFormat;
}
