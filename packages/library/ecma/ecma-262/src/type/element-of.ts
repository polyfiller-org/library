import {List} from "../lib/list/list";

export type ElementOf<IterableType> = IterableType extends (infer ElementType)[]
	? ElementType
	: IterableType extends readonly (infer ReadonlyElementType)[]
	? ReadonlyElementType
	: IterableType extends List<infer ListElementType>
	? ListElementType
	: IterableType extends Set<infer SetElementType>
	? SetElementType
	: never;
