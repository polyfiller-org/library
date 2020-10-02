import {List} from "../../lib/list/list";
import {Intrinsics} from "../../intrinsic/intrinsics";

export interface Realm {
	"[[Intrinsics]]": Intrinsics;
	"[[GlobalObject]]": typeof globalThis;
	"[[GlobalEnv]]": {} | undefined;
	"[[TemplateMap]]": List<never>;
	"[[HostDefined]]": undefined;
}
