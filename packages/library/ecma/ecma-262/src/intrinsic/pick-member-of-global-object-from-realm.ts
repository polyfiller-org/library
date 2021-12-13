import {Realm} from "../environment/realm/realm";
import {GlobalThisValue} from "../environment/global-this-value";

const globalThisValue = GlobalThisValue();

export function pickMemberOfGlobalObjectFromRealm<
	T,
	MemberName extends keyof Realm["[[GlobalObject]]"],
	SubMemberName extends keyof Realm["[[GlobalObject]]"][MemberName],
	SubSubMemberName extends keyof Realm["[[GlobalObject]]"][MemberName][SubMemberName]
>(nativeMember: T | undefined, realm: Realm, memberName: MemberName, subMemberName?: SubMemberName, subSubMemberName?: SubSubMemberName): T {
	const globalObject = realm["[[GlobalObject]]"];
	if (globalObject === globalThisValue && nativeMember !== undefined) {
		return nativeMember;
	}

	return subMemberName == null
		? (realm["[[GlobalObject]]"] as unknown as Record<MemberName, T>)[memberName]
		: subSubMemberName == null
		? ((realm["[[GlobalObject]]"] as unknown as Record<MemberName, Record<SubMemberName, T>>)[memberName][subMemberName] as T)
		: ((realm["[[GlobalObject]]"] as unknown as Record<MemberName, Record<SubMemberName, Record<SubSubMemberName, T>>>)[memberName][subMemberName][subSubMemberName] as T);
}
