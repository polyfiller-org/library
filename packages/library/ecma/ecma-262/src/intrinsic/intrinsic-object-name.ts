import {ElementOf} from "../type/element-of";

export const INTRINSIC_OBJECT_NAME = [
	"%ObjectPrototype%",
	"%Array%",
	"%ArrayBuffer%",
	"%ArrayBufferPrototype%",
	"%ArrayIteratorPrototype%",
	"%ArrayPrototype%",
	"%ArrayProto_entries%",
	"%ArrayProto_forEach%",
	"%ArrayProto_keys%",
	"%ArrayProto_values%",
	"%AsyncFromSyncIteratorPrototype%",
	"%AsyncFunction%",
	"%AsyncFunctionPrototype%",
	"%AsyncGenerator%",
	"%AsyncGeneratorFunction%",
	"%AsyncGeneratorPrototype%",
	"%AsyncIteratorPrototype%",
	"%Atomics%",
	"%Boolean%",
	"%BooleanPrototype%",
	"%DataView%",
	"%DataViewPrototype%",
	"%Date%",
	"%DatePrototype%",
	"%decodeURI%",
	"%decodeURIComponent%",
	"%encodeURI%",
	"%encodeURIComponent%",
	"%Error%",
	"%ErrorPrototype%",
	"%eval%",
	"%EvalError%",
	"%EvalErrorPrototype%",
	"%Float32Array%",
	"%Float32ArrayPrototype%",
	"%Float64Array%",
	"%Float64ArrayPrototype%",
	"%Function%",
	"%FunctionPrototype%",
	"%Generator%",
	"%GeneratorFunction%",
	"%GeneratorPrototype%",
	"%Int8Array%",
	"%Int8ArrayPrototype%",
	"%Int16Array%",
	"%Int16ArrayPrototype%",
	"%Int32Array%",
	"%Int32ArrayPrototype%",
	"%isFinite%",
	"%isNaN%",
	"%IteratorPrototype%",
	"%JSON%",
	"%JSONParse%",
	"%JSONStringify%",
	"%Map%",
	"%MapIteratorPrototype%",
	"%MapPrototype%",
	"%Math%",
	"%Number%",
	"%NumberPrototype%",
	"%Object%",
	"%ObjProto_toString%",
	"%ObjProto_valueOf%",
	"%parseFloat%",
	"%parseInt%",
	"%Promise%",
	"%PromisePrototype%",
	"%PromiseProto_then%",
	"%Promise_all%",
	"%Promise_reject%",
	"%Promise_resolve%",
	"%Proxy%",
	"%RangeError%",
	"%RangeErrorPrototype%",
	"%ReferenceError%",
	"%ReferenceErrorPrototype%",
	"%Reflect%",
	"%RegExp%",
	"%RegExpPrototype%",
	"%Set%",
	"%SetIteratorPrototype%",
	"%SetPrototype%",
	"%SharedArrayBuffer%",
	"%SharedArrayBufferPrototype%",
	"%String%",
	"%StringIteratorPrototype%",
	"%StringPrototype%",
	"%Symbol%",
	"%SymbolPrototype%",
	"%SyntaxError%",
	"%SyntaxErrorPrototype%",
	"%ThrowTypeError%",
	"%TypedArray%",
	"%TypedArrayPrototype%",
	"%TypeError%",
	"%TypeErrorPrototype%",
	"%Uint8Array%",
	"%Uint8ArrayPrototype%",
	"%Uint8ClampedArray%",
	"%Uint8ClampedArrayPrototype%",
	"%Uint16Array%",
	"%Uint16ArrayPrototype%",
	"%Uint32Array%",
	"%Uint32ArrayPrototype%",
	"%URIError%",
	"%URIErrorPrototype%",
	"%WeakMap%",
	"%WeakMapPrototype%",
	"%WeakSet%",
	"%WeakSetPrototype%"
] as const;

export const intrinsicObjectNameToIntrinsicPropertyKey = {
	"%ObjectPrototype%": "[[%ObjectPrototype%]]",
	"%Array%": "[[%Array%]]",
	"%ArrayBuffer%": "[[%ArrayBuffer%]]",
	"%ArrayBufferPrototype%": "[[%ArrayBufferPrototype%]]",
	"%ArrayIteratorPrototype%": "[[%ArrayIteratorPrototype%]]",
	"%ArrayPrototype%": "[[%ArrayPrototype%]]",
	"%ArrayProto_entries%": "[[%ArrayProto_entries%]]",
	"%ArrayProto_forEach%": "[[%ArrayProto_forEach%]]",
	"%ArrayProto_keys%": "[[%ArrayProto_keys%]]",
	"%ArrayProto_values%": "[[%ArrayProto_values%]]",
	"%AsyncFromSyncIteratorPrototype%": "[[%AsyncFromSyncIteratorPrototype%]]",
	"%AsyncFunction%": "[[%AsyncFunction%]]",
	"%AsyncFunctionPrototype%": "[[%AsyncFunctionPrototype%]]",
	"%AsyncGenerator%": "[[%AsyncGenerator%]]",
	"%AsyncGeneratorFunction%": "[[%AsyncGeneratorFunction%]]",
	"%AsyncGeneratorPrototype%": "[[%AsyncGeneratorPrototype%]]",
	"%AsyncIteratorPrototype%": "[[%AsyncIteratorPrototype%]]",
	"%Atomics%": "[[%Atomics%]]",
	"%Boolean%": "[[%Boolean%]]",
	"%BooleanPrototype%": "[[%BooleanPrototype%]]",
	"%DataView%": "[[%DataView%]]",
	"%DataViewPrototype%": "[[%DataViewPrototype%]]",
	"%Date%": "[[%Date%]]",
	"%DatePrototype%": "[[%DatePrototype%]]",
	"%decodeURI%": "[[%decodeURI%]]",
	"%decodeURIComponent%": "[[%decodeURIComponent%]]",
	"%encodeURI%": "[[%encodeURI%]]",
	"%encodeURIComponent%": "[[%encodeURIComponent%]]",
	"%Error%": "[[%Error%]]",
	"%ErrorPrototype%": "[[%ErrorPrototype%]]",
	"%eval%": "[[%eval%]]",
	"%EvalError%": "[[%EvalError%]]",
	"%EvalErrorPrototype%": "[[%EvalErrorPrototype%]]",
	"%Float32Array%": "[[%Float32Array%]]",
	"%Float32ArrayPrototype%": "[[%Float32ArrayPrototype%]]",
	"%Float64Array%": "[[%Float64Array%]]",
	"%Float64ArrayPrototype%": "[[%Float64ArrayPrototype%]]",
	"%Function%": "[[%Function%]]",
	"%FunctionPrototype%": "[[%FunctionPrototype%]]",
	"%Generator%": "[[%Generator%]]",
	"%GeneratorFunction%": "[[%GeneratorFunction%]]",
	"%GeneratorPrototype%": "[[%GeneratorPrototype%]]",
	"%Int8Array%": "[[%Int8Array%]]",
	"%Int8ArrayPrototype%": "[[%Int8ArrayPrototype%]]",
	"%Int16Array%": "[[%Int16Array%]]",
	"%Int16ArrayPrototype%": "[[%Int16ArrayPrototype%]]",
	"%Int32Array%": "[[%Int32Array%]]",
	"%Int32ArrayPrototype%": "[[%Int32ArrayPrototype%]]",
	"%isFinite%": "[[%isFinite%]]",
	"%isNaN%": "[[%isNaN%]]",
	"%IteratorPrototype%": "[[%IteratorPrototype%]]",
	"%JSON%": "[[%JSON%]]",
	"%JSONParse%": "[[%JSONParse%]]",
	"%JSONStringify%": "[[%JSONStringify%]]",
	"%Map%": "[[%Map%]]",
	"%MapIteratorPrototype%": "[[%MapIteratorPrototype%]]",
	"%MapPrototype%": "[[%MapPrototype%]]",
	"%Math%": "[[%Math%]]",
	"%Number%": "[[%Number%]]",
	"%NumberPrototype%": "[[%NumberPrototype%]]",
	"%Object%": "[[%Object%]]",
	"%ObjProto_toString%": "[[%ObjProto_toString%]]",
	"%ObjProto_valueOf%": "[[%ObjProto_valueOf%]]",
	"%parseFloat%": "[[%parseFloat%]]",
	"%parseInt%": "[[%parseInt%]]",
	"%Promise%": "[[%Promise%]]",
	"%PromisePrototype%": "[[%PromisePrototype%]]",
	"%PromiseProto_then%": "[[%PromiseProto_then%]]",
	"%Promise_all%": "[[%Promise_all%]]",
	"%Promise_reject%": "[[%Promise_reject%]]",
	"%Promise_resolve%": "[[%Promise_resolve%]]",
	"%Proxy%": "[[%Proxy%]]",
	"%RangeError%": "[[%RangeError%]]",
	"%RangeErrorPrototype%": "[[%RangeErrorPrototype%]]",
	"%ReferenceError%": "[[%ReferenceError%]]",
	"%ReferenceErrorPrototype%": "[[%ReferenceErrorPrototype%]]",
	"%Reflect%": "[[%Reflect%]]",
	"%RegExp%": "[[%RegExp%]]",
	"%RegExpPrototype%": "[[%RegExpPrototype%]]",
	"%Set%": "[[%Set%]]",
	"%SetIteratorPrototype%": "[[%SetIteratorPrototype%]]",
	"%SetPrototype%": "[[%SetPrototype%]]",
	"%SharedArrayBuffer%": "[[%SharedArrayBuffer%]]",
	"%SharedArrayBufferPrototype%": "[[%SharedArrayBufferPrototype%]]",
	"%String%": "[[%String%]]",
	"%StringIteratorPrototype%": "[[%StringIteratorPrototype%]]",
	"%StringPrototype%": "[[%StringPrototype%]]",
	"%Symbol%": "[[%Symbol%]]",
	"%SymbolPrototype%": "[[%SymbolPrototype%]]",
	"%SyntaxError%": "[[%SyntaxError%]]",
	"%SyntaxErrorPrototype%": "[[%SyntaxErrorPrototype%]]",
	"%ThrowTypeError%": "[[%ThrowTypeError%]]",
	"%TypedArray%": "[[%TypedArray%]]",
	"%TypedArrayPrototype%": "[[%TypedArrayPrototype%]]",
	"%TypeError%": "[[%TypeError%]]",
	"%TypeErrorPrototype%": "[[%TypeErrorPrototype%]]",
	"%Uint8Array%": "[[%Uint8Array%]]",
	"%Uint8ArrayPrototype%": "[[%Uint8ArrayPrototype%]]",
	"%Uint8ClampedArray%": "[[%Uint8ClampedArray%]]",
	"%Uint8ClampedArrayPrototype%": "[[%Uint8ClampedArrayPrototype%]]",
	"%Uint16Array%": "[[%Uint16Array%]]",
	"%Uint16ArrayPrototype%": "[[%Uint16ArrayPrototype%]]",
	"%Uint32Array%": "[[%Uint32Array%]]",
	"%Uint32ArrayPrototype%": "[[%Uint32ArrayPrototype%]]",
	"%URIError%": "[[%URIError%]]",
	"%URIErrorPrototype%": "[[%URIErrorPrototype%]]",
	"%WeakMap%": "[[%WeakMap%]]",
	"%WeakMapPrototype%": "[[%WeakMapPrototype%]]",
	"%WeakSet%": "[[%WeakSet%]]",
	"%WeakSetPrototype%": "[[%WeakSetPrototype%]]"
} as const;

export type IntrinsicObjectName = ElementOf<typeof INTRINSIC_OBJECT_NAME>;
