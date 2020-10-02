import {ElementOf} from "./element-of";
import {List} from "../lib/list/list";

export type EcmascriptLanguageType = "Undefined" | "Null" | "String" | "Boolean" | "Number" | "Symbol" | "Object";
export type EcmascriptLanguageTypeLiteral = undefined | null | string | boolean | number | symbol | object | unknown;

export interface EcmaScriptLanguageTypeToType {
	Undefined: undefined;
	Null: null;
	String: string;
	Boolean: boolean;
	Number: number;
	Symbol: symbol;
	Object: object;
}

export type EcmascriptLanguageTypesToTypes<
	Types extends EcmascriptLanguageType[] | List<EcmascriptLanguageType> | readonly EcmascriptLanguageType[] | Set<EcmascriptLanguageType>
> = {
	[Key in ElementOf<Types>]: EcmaScriptLanguageTypeToType[Key];
}[ElementOf<Types>];
