import {Realm} from "../environment/realm/realm";
import {Intrinsics} from "../intrinsic/intrinsics";
import {$Array$} from "../intrinsic/array";
import {$ArrayBuffer$} from "../intrinsic/array-buffer";
import {$ArrayBufferPrototype$} from "../intrinsic/array-buffer-prototype";
import {$ArrayIteratorPrototype$} from "../intrinsic/array-iterator-prototype";
import {$ArrayPrototype$} from "../intrinsic/array-prototype";
import {$ArrayProto_entries$} from "../intrinsic/array-proto-entries";
import {$ArrayProto_values$} from "../intrinsic/array-proto-values";
import {$ArrayProto_keys$} from "../intrinsic/array-proto-keys";
import {$ArrayProto_forEach$} from "../intrinsic/array-proto-for-each";
import {$AsyncFromSyncIteratorPrototype$} from "../intrinsic/async-from-sync-iterator-prototype";
import {$AsyncFunction$} from "../intrinsic/async-function";
import {$AsyncFunctionPrototype$} from "../intrinsic/async-function-prototype";
import {$AsyncGenerator$} from "../intrinsic/async-generator";
import {$AsyncGeneratorFunction$} from "../intrinsic/async-generator-function";
import {$AsyncGeneratorPrototype$} from "../intrinsic/async-generator-prototype";
import {$AsyncIteratorPrototype$} from "../intrinsic/async-iterator-prototype";
import {$Atomics$} from "../intrinsic/atomics";
import {$Boolean$} from "../intrinsic/boolean";
import {$BooleanPrototype$} from "../intrinsic/boolean-prototype";
import {$DataView$} from "../intrinsic/data-view";
import {$DataViewPrototype$} from "../intrinsic/data-view-prototype";
import {$Date$} from "../intrinsic/date";
import {$DatePrototype$} from "../intrinsic/date-prototype";
import {$decodeURI$} from "../intrinsic/decode-uri";
import {$decodeURIComponent$} from "../intrinsic/decode-uri-component";
import {$encodeURIComponent$} from "../intrinsic/encode-uri-component";
import {$encodeURI$} from "../intrinsic/encode-uri";
import {$Error$} from "../intrinsic/error";
import {$ErrorPrototype$} from "../intrinsic/error-prototype";
import {$eval$} from "../intrinsic/eval";
import {$EvalError$} from "../intrinsic/eval-error";
import {$EvalErrorPrototype$} from "../intrinsic/eval-error-prototype";
import {$Float32Array$} from "../intrinsic/float-32-array";
import {$Float32ArrayPrototype$} from "../intrinsic/float-32-array-prototype";
import {$Float64ArrayPrototype$} from "../intrinsic/float-64-array-prototype";
import {$Float64Array$} from "../intrinsic/float-64-array";
import {$Generator$} from "../intrinsic/generator";
import {$GeneratorFunction$} from "../intrinsic/generator-function";
import {$GeneratorPrototype$} from "../intrinsic/generator-prototype";
import {$Int8Array$} from "../intrinsic/int-8-array";
import {$Int8ArrayPrototype$} from "../intrinsic/int-8-array-prototype";
import {$Int16Array$} from "../intrinsic/int-16-array";
import {$Int16ArrayPrototype$} from "../intrinsic/int-16-array-prototype";
import {$Int32ArrayPrototype$} from "../intrinsic/int-32-array-prototype";
import {$Int32Array$} from "../intrinsic/int-32-array";
import {$isFinite$} from "../intrinsic/is-finite";
import {$isNaN$} from "../intrinsic/is-nan";
import {$IteratorPrototype$} from "../intrinsic/iterator-prototype";
import {$JSON$} from "../intrinsic/json";
import {$JSONParse$} from "../intrinsic/json-parse";
import {$JSONStringify$} from "../intrinsic/json-stringify";
import {$Map$} from "../intrinsic/map";
import {$MapIteratorPrototype$} from "../intrinsic/map-iterator-prototype";
import {$MapPrototype$} from "../intrinsic/map-prototype";
import {$Math$} from "../intrinsic/math";
import {$Number$} from "../intrinsic/number";
import {$NumberPrototype$} from "../intrinsic/number-prototype";
import {$Object$} from "../intrinsic/object";
import {$ObjectPrototype$} from "../intrinsic/object-prototype";
import {$Function$} from "../intrinsic/function";
import {$FunctionPrototype$} from "../intrinsic/function-prototype";
import {$ThrowTypeError$} from "../intrinsic/throw-type-error";
import {$ObjProto_toString$} from "../intrinsic/obj-proto-to-string";
import {$ObjProto_valueOf$} from "../intrinsic/obj-proto-value-of";
import {$parseFloat$} from "../intrinsic/parse-float";
import {$parseInt$} from "../intrinsic/parse-int";
import {$Promise$} from "../intrinsic/promise-prototype";
import {$PromisePrototype$} from "../intrinsic/promise";
import {$PromiseProto_then$} from "../intrinsic/promise-proto-then";
import {$Promise_all$} from "../intrinsic/promise-all";
import {$Promise_reject$} from "../intrinsic/promise-reject";
import {$Promise_resolve$} from "../intrinsic/promise-resolve";
import {$Proxy$} from "../intrinsic/proxy";
import {$RangeError$} from "../intrinsic/range-error";
import {$RangeErrorPrototype$} from "../intrinsic/range-error-prototype";
import {$ReferenceError$} from "../intrinsic/reference-error";
import {$ReferenceErrorPrototype$} from "../intrinsic/reference-error-prototype";
import {$Reflect$} from "../intrinsic/reflect";
import {$RegExp$} from "../intrinsic/reg-exp";
import {$RegExpPrototype$} from "../intrinsic/reg-exp-prototype";
import {$Set$} from "../intrinsic/set";
import {$SetPrototype$} from "../intrinsic/set-prototype";
import {$SetIteratorPrototype$} from "../intrinsic/set-iterator-prototype";
import {$SharedArrayBuffer$} from "../intrinsic/shared-array-buffer";
import {$SharedArrayBufferPrototype$} from "../intrinsic/shared-array-buffer-prototype";
import {$String$} from "../intrinsic/string";
import {$StringIteratorPrototype$} from "../intrinsic/string-iterator-prototype";
import {$StringPrototype$} from "../intrinsic/string-prototype";
import {$Symbol$} from "../intrinsic/symbol";
import {$SymbolPrototype$} from "../intrinsic/symbol-prototype";
import {$SyntaxError$} from "../intrinsic/syntax-error";
import {$SyntaxErrorPrototype$} from "../intrinsic/syntax-error-prototype";
import {$TypedArray$} from "../intrinsic/typed-array";
import {$TypedArrayPrototype$} from "../intrinsic/typed-array-prototype";
import {$TypeError$} from "../intrinsic/type-error";
import {$TypeErrorPrototype$} from "../intrinsic/type-error-prototype";
import {$Uint8Array$} from "../intrinsic/uint-8-array";
import {$Uint8ArrayPrototype$} from "../intrinsic/uint-8-array-prototype";
import {$Uint8ClampedArray$} from "../intrinsic/uint-8-clamped-array";
import {$Uint8ClampedArrayPrototype$} from "../intrinsic/uint-8-clamped-array-prototype";
import {$Uint16Array$} from "../intrinsic/uint-16-array";
import {$Uint16ArrayPrototype$} from "../intrinsic/uint-16-array-prototype";
import {$Uint32Array$} from "../intrinsic/uint-32-array";
import {$Uint32ArrayPrototype$} from "../intrinsic/uint-32-array-prototype";
import {$URIError$} from "../intrinsic/uri-error";
import {$URIErrorPrototype$} from "../intrinsic/uri-error-prototype";
import {$WeakMapPrototype$} from "../intrinsic/weak-map-prototype";
import {$WeakMap$} from "../intrinsic/weak-map";
import {$WeakSet$} from "../intrinsic/weak-set";
import {$WeakSetPrototype$} from "../intrinsic/weak-set-prototype";
import {$RegExpStringIteratorPrototype$} from "../intrinsic/reg-exp-string-iterator-prototype";

export function CreateIntrinsics(realmRec: Realm): Intrinsics {
	// Let intrinsics be a new Record.
	const intrinsics = {} as Intrinsics;

	// Set realmRec.[[Intrinsics]] to intrinsics.
	realmRec["[[Intrinsics]]"] = intrinsics;

	// Let objProto be ObjectCreate(null).
	// Set intrinsics.[[%ObjectPrototype%]] to objProto.
	// Let throwerSteps be the algorithm steps specified in 9.2.9.1 for the %ThrowTypeError% function.
	// Let thrower be CreateBuiltinFunction(throwerSteps, « », realmRec, null).
	// Set intrinsics.[[%ThrowTypeError%]] to thrower.
	// Let noSteps be an empty sequence of algorithm steps.
	// Let funcProto be CreateBuiltinFunction(noSteps, « », realmRec, objProto).
	// Set intrinsics.[[%FunctionPrototype%]] to funcProto.
	// Call thrower.[[SetPrototypeOf]](funcProto).
	// Perform AddRestrictedFunctionProperties(funcProto, realmRec).
	// Set fields of intrinsics with the values listed in Table 7 that have not already been handled above.
	// The field names are the names listed in column one of the table. The value of each field is a new object
	// value fully and recursively populated with property values as defined by the specification of each object
	// in clauses 18-26. All object property values are newly created object values. All values that are built-in
	// function objects are created by performing CreateBuiltinFunction(<steps>, <slots>, realmRec, <prototype>)
	// where <steps> is the definition of that function provided by this specification, <slots> is a list of the names,
	// if any, of the function's specified internal slots, and <prototype> is the specified value of the function's
	// [[Prototype]] internal slot. The creation of the intrinsics and their properties must be ordered to avoid any
	// dependencies upon objects that have not yet been created.
	intrinsics["[[%Object%]]"] = $Object$(realmRec);
	intrinsics["[[%ObjectPrototype%]]"] = $ObjectPrototype$(realmRec);
	intrinsics["[[%Function%]]"] = $Function$(realmRec);
	intrinsics["[[%FunctionPrototype%]]"] = $FunctionPrototype$(realmRec);
	intrinsics["[[%Array%]]"] = $Array$(realmRec);
	intrinsics["[[%ArrayBuffer%]]"] = $ArrayBuffer$(realmRec);
	intrinsics["[[%ArrayBufferPrototype%]]"] = $ArrayBufferPrototype$(realmRec);
	intrinsics["[[%IteratorPrototype%]]"] = $IteratorPrototype$(realmRec);
	intrinsics["[[%ArrayIteratorPrototype%]]"] = $ArrayIteratorPrototype$(realmRec);
	intrinsics["[[%ArrayPrototype%]]"] = $ArrayPrototype$(realmRec);
	intrinsics["[[%ArrayProto_entries%]]"] = $ArrayProto_entries$(realmRec);
	intrinsics["[[%ArrayProto_forEach%]]"] = $ArrayProto_forEach$(realmRec);
	intrinsics["[[%ArrayProto_keys%]]"] = $ArrayProto_keys$(realmRec);
	intrinsics["[[%ArrayProto_values%]]"] = $ArrayProto_values$(realmRec);
	intrinsics["[[%AsyncIteratorPrototype%]]"] = $AsyncIteratorPrototype$(realmRec);
	intrinsics["[[%AsyncFromSyncIteratorPrototype%]]"] = $AsyncFromSyncIteratorPrototype$(realmRec);
	intrinsics["[[%AsyncFunction%]]"] = $AsyncFunction$(realmRec);
	intrinsics["[[%AsyncFunctionPrototype%]]"] = $AsyncFunctionPrototype$(realmRec);
	intrinsics["[[%AsyncGenerator%]]"] = $AsyncGenerator$(realmRec);
	intrinsics["[[%AsyncGeneratorFunction%]]"] = $AsyncGeneratorFunction$(realmRec);
	intrinsics["[[%AsyncGeneratorPrototype%]]"] = $AsyncGeneratorPrototype$(realmRec);
	intrinsics["[[%Atomics%]]"] = $Atomics$(realmRec);
	intrinsics["[[%Boolean%]]"] = $Boolean$(realmRec);
	intrinsics["[[%BooleanPrototype%]]"] = $BooleanPrototype$(realmRec);
	intrinsics["[[%DataView%]]"] = $DataView$(realmRec);
	intrinsics["[[%DataViewPrototype%]]"] = $DataViewPrototype$(realmRec);
	intrinsics["[[%Date%]]"] = $Date$(realmRec);
	intrinsics["[[%DatePrototype%]]"] = $DatePrototype$(realmRec);
	intrinsics["[[%decodeURI%]]"] = $decodeURI$(realmRec);
	intrinsics["[[%decodeURIComponent%]]"] = $decodeURIComponent$(realmRec);
	intrinsics["[[%encodeURI%]]"] = $encodeURI$(realmRec);
	intrinsics["[[%encodeURIComponent%]]"] = $encodeURIComponent$(realmRec);
	intrinsics["[[%Error%]]"] = $Error$(realmRec);
	intrinsics["[[%ErrorPrototype%]]"] = $ErrorPrototype$(realmRec);
	intrinsics["[[%eval%]]"] = $eval$(realmRec);
	intrinsics["[[%EvalError%]]"] = $EvalError$(realmRec);
	intrinsics["[[%EvalErrorPrototype%]]"] = $EvalErrorPrototype$(realmRec);
	intrinsics["[[%Float32Array%]]"] = $Float32Array$(realmRec);
	intrinsics["[[%Float32ArrayPrototype%]]"] = $Float32ArrayPrototype$(realmRec);
	intrinsics["[[%Float64Array%]]"] = $Float64Array$(realmRec);
	intrinsics["[[%Float64ArrayPrototype%]]"] = $Float64ArrayPrototype$(realmRec);
	intrinsics["[[%Generator%]]"] = $Generator$(realmRec);
	intrinsics["[[%GeneratorFunction%]]"] = $GeneratorFunction$(realmRec);
	intrinsics["[[%GeneratorPrototype%]]"] = $GeneratorPrototype$(realmRec);
	intrinsics["[[%Int8Array%]]"] = $Int8Array$(realmRec);
	intrinsics["[[%Int8ArrayPrototype%]]"] = $Int8ArrayPrototype$(realmRec);
	intrinsics["[[%Int16Array%]]"] = $Int16Array$(realmRec);
	intrinsics["[[%Int16ArrayPrototype%]]"] = $Int16ArrayPrototype$(realmRec);
	intrinsics["[[%Int32Array%]]"] = $Int32Array$(realmRec);
	intrinsics["[[%Int32ArrayPrototype%]]"] = $Int32ArrayPrototype$(realmRec);
	intrinsics["[[%isFinite%]]"] = $isFinite$(realmRec);
	intrinsics["[[%isNaN%]]"] = $isNaN$(realmRec);
	intrinsics["[[%JSON%]]"] = $JSON$(realmRec);
	intrinsics["[[%JSONParse%]]"] = $JSONParse$(realmRec);
	intrinsics["[[%JSONStringify%]]"] = $JSONStringify$(realmRec);
	intrinsics["[[%Map%]]"] = $Map$(realmRec);
	intrinsics["[[%MapIteratorPrototype%]]"] = $MapIteratorPrototype$(realmRec);
	intrinsics["[[%MapPrototype%]]"] = $MapPrototype$(realmRec);
	intrinsics["[[%Math%]]"] = $Math$(realmRec);
	intrinsics["[[%Number%]]"] = $Number$(realmRec);
	intrinsics["[[%NumberPrototype%]]"] = $NumberPrototype$(realmRec);
	intrinsics["[[%ObjProto_toString%]]"] = $ObjProto_toString$(realmRec);
	intrinsics["[[%ObjProto_valueOf%]]"] = $ObjProto_valueOf$(realmRec);
	intrinsics["[[%parseFloat%]]"] = $parseFloat$(realmRec);
	intrinsics["[[%parseInt%]]"] = $parseInt$(realmRec);
	intrinsics["[[%Promise%]]"] = $Promise$(realmRec);
	intrinsics["[[%PromisePrototype%]]"] = $PromisePrototype$(realmRec);
	intrinsics["[[%PromiseProto_then%]]"] = $PromiseProto_then$(realmRec);
	intrinsics["[[%Promise_all%]]"] = $Promise_all$(realmRec);
	intrinsics["[[%Promise_reject%]]"] = $Promise_reject$(realmRec);
	intrinsics["[[%Promise_resolve%]]"] = $Promise_resolve$(realmRec);
	intrinsics["[[%Proxy%]]"] = $Proxy$(realmRec);
	intrinsics["[[%RangeError%]]"] = $RangeError$(realmRec);
	intrinsics["[[%RangeErrorPrototype%]]"] = $RangeErrorPrototype$(realmRec);
	intrinsics["[[%ReferenceError%]]"] = $ReferenceError$(realmRec);
	intrinsics["[[%ReferenceErrorPrototype%]]"] = $ReferenceErrorPrototype$(realmRec);
	intrinsics["[[%Reflect%]]"] = $Reflect$(realmRec);
	intrinsics["[[%RegExp%]]"] = $RegExp$(realmRec);
	intrinsics["[[%RegExpPrototype%]]"] = $RegExpPrototype$(realmRec);
	intrinsics["[[%Set%]]"] = $Set$(realmRec);
	intrinsics["[[%SetIteratorPrototype%]]"] = $SetIteratorPrototype$(realmRec);
	intrinsics["[[%SetPrototype%]]"] = $SetPrototype$(realmRec);
	intrinsics["[[%SharedArrayBuffer%]]"] = $SharedArrayBuffer$(realmRec);
	intrinsics["[[%SharedArrayBufferPrototype%]]"] = $SharedArrayBufferPrototype$(realmRec);
	intrinsics["[[%String%]]"] = $String$(realmRec);
	intrinsics["[[%StringIteratorPrototype%]]"] = $StringIteratorPrototype$(realmRec);
	intrinsics["[[%RegExpStringIteratorPrototype%]]"] = $RegExpStringIteratorPrototype$(realmRec);
	intrinsics["[[%StringPrototype%]]"] = $StringPrototype$(realmRec);
	intrinsics["[[%Symbol%]]"] = $Symbol$(realmRec);
	intrinsics["[[%SymbolPrototype%]]"] = $SymbolPrototype$(realmRec);
	intrinsics["[[%SyntaxError%]]"] = $SyntaxError$(realmRec);
	intrinsics["[[%SyntaxErrorPrototype%]]"] = $SyntaxErrorPrototype$(realmRec);
	intrinsics["[[%ThrowTypeError%]]"] = $ThrowTypeError$(realmRec);
	intrinsics["[[%TypedArray%]]"] = $TypedArray$(realmRec);
	intrinsics["[[%TypedArrayPrototype%]]"] = $TypedArrayPrototype$(realmRec);
	intrinsics["[[%TypeError%]]"] = $TypeError$(realmRec);
	intrinsics["[[%TypeErrorPrototype%]]"] = $TypeErrorPrototype$(realmRec);
	intrinsics["[[%Uint8Array%]]"] = $Uint8Array$(realmRec);
	intrinsics["[[%Uint8ArrayPrototype%]]"] = $Uint8ArrayPrototype$(realmRec);
	intrinsics["[[%Uint8ClampedArray%]]"] = $Uint8ClampedArray$(realmRec);
	intrinsics["[[%Uint8ClampedArrayPrototype%]]"] = $Uint8ClampedArrayPrototype$(realmRec);
	intrinsics["[[%Uint16Array%]]"] = $Uint16Array$(realmRec);
	intrinsics["[[%Uint16ArrayPrototype%]]"] = $Uint16ArrayPrototype$(realmRec);
	intrinsics["[[%Uint32Array%]]"] = $Uint32Array$(realmRec);
	intrinsics["[[%Uint32ArrayPrototype%]]"] = $Uint32ArrayPrototype$(realmRec);
	intrinsics["[[%URIError%]]"] = $URIError$(realmRec);
	intrinsics["[[%URIErrorPrototype%]]"] = $URIErrorPrototype$(realmRec);
	intrinsics["[[%WeakMap%]]"] = $WeakMap$(realmRec);
	intrinsics["[[%WeakMapPrototype%]]"] = $WeakMapPrototype$(realmRec);
	intrinsics["[[%WeakSet%]]"] = $WeakSet$(realmRec);
	intrinsics["[[%WeakSetPrototype%]]"] = $WeakSetPrototype$(realmRec);

	// Return intrinsics.
	return intrinsics;
}
