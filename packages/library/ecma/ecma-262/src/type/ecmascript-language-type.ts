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

export type EcmascriptLanguageTypesToTypes<Type extends EcmascriptLanguageType> = EcmaScriptLanguageTypeToType[Type];
