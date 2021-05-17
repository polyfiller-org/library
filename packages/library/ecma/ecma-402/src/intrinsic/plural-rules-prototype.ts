import {Realm} from "@polyfiller/ecma-262";

export function $PluralRulesPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.PluralRules.prototype;
}
