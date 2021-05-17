import {List} from "../../lib/list/list";
import {Intrinsics} from "../../intrinsic/intrinsics";

export interface Realm<TIntrinsics extends Intrinsics = Intrinsics> {
	"[[Intrinsics]]": TIntrinsics;
	"[[GlobalObject]]": typeof globalThis;
	"[[GlobalEnv]]": {} | undefined;
	"[[TemplateMap]]": List<never>;
	"[[HostDefined]]": undefined;
}
