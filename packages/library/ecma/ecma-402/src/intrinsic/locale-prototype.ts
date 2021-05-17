import {Realm} from "@polyfiller/ecma-262";

export function $LocalePrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.Locale.prototype;
}
