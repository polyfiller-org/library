import {Realm} from "../environment/realm/realm";

/**
 * https://tc39.es/ecma262/#realm-record
 */
export function IsRealm(argument: unknown): argument is Realm {
	return (
		typeof argument === "object" &&
		argument != null &&
		"[[Intrinsics]]" in argument &&
		"[[GlobalObject]]" in argument &&
		"[[GlobalEnv]]" in argument &&
		"[[TemplateMap]]" in argument &&
		"[[HostDefined]]" in argument
	);
}
