import {Realm} from "../environment/realm/realm";

export function $DataViewPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].DataView.prototype;
}
