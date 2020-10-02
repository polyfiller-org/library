import {Realm} from "../environment/realm/realm";

export function $String$(realm: Realm) {
	return realm["[[GlobalObject]]"].String;
}
