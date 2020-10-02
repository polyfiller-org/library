export interface InternalValueDataDescriptor {
	"[[Configurable]]"?: boolean;
	"[[Enumerable]]"?: boolean;
	"[[Value]]": any;
	"[[Writable]]"?: boolean;
	"[[Get]]"?(): any;
	"[[Set]]"?(v: any): void;
}

export interface InternalWritableDataDescriptor {
	"[[Configurable]]"?: boolean;
	"[[Enumerable]]"?: boolean;
	"[[Value]]"?: any;
	"[[Writable]]": boolean;
	"[[Get]]"?(): any;
	"[[Set]]"?(v: any): void;
}

export interface InternalGetAccessorDescriptor {
	"[[Configurable]]"?: boolean;
	"[[Enumerable]]"?: boolean;
	"[[Value]]"?: any;
	"[[Writable]]"?: boolean;
	"[[Get]]"(): any;
	"[[Set]]"?(v: any): void;
}

export interface InternalSetAccessorDescriptor {
	"[[Configurable]]"?: boolean;
	"[[Enumerable]]"?: boolean;
	"[[Value]]"?: any;
	"[[Writable]]"?: boolean;
	"[[Get]]"?(): any;
	"[[Set]]"(v: any): void;
}

export interface InternalEnumerableDescriptor {
	"[[Configurable]]"?: boolean;
	"[[Enumerable]]": boolean;
	"[[Value]]"?: any;
	"[[Writable]]"?: boolean;
	"[[Get]]"?(): any;
	"[[Set]]"?(v: any): void;
}

export interface InternalConfigurableDescriptor {
	"[[Configurable]]": boolean;
	"[[Enumerable]]"?: boolean;
	"[[Value]]"?: any;
	"[[Writable]]"?: boolean;
	"[[Get]]"?(): any;
	"[[Set]]"?(v: any): void;
}

export type InternalDataDescriptor =
	| InternalValueDataDescriptor
	| InternalWritableDataDescriptor
	| (InternalValueDataDescriptor & InternalWritableDataDescriptor);
export type InternalAccessorDescriptor =
	| InternalGetAccessorDescriptor
	| InternalSetAccessorDescriptor
	| (InternalGetAccessorDescriptor & InternalSetAccessorDescriptor);
export type InternalPropertyDescriptor =
	| InternalConfigurableDescriptor
	| InternalDataDescriptor
	| InternalAccessorDescriptor
	| InternalEnumerableDescriptor;
