import {IsPropertyKey} from "./is-property-key";
import {assert} from "./assert";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {toInternalPropertyDescriptor} from "../util/to-internal-property-descriptor";
import {IsDataDescriptor} from "./is-data-descriptor";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {internals} from "../lib/internal-slot-map/internals";
import {errorFormatArgument} from "../util/error-format-argument";

// NOTE: Object.prototype.hasOwnProperty is supported in ES3, so this is OK
const OBJECT_PROTOTYPE_HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty;

function tryNativeGetOwnPropertyDescriptor(object: object & {__property__?: number}): boolean {
	try {
		object.__property__ = 1;
		const descriptor = Object.getOwnPropertyDescriptor(object, "__property__");
		return descriptor != null && descriptor.value === 1;
	} catch {
		// returns falsy
		return false;
	}
}

const WORKS_ON_OBJECTS = tryNativeGetOwnPropertyDescriptor({});
const WORKS_ON_DOM_OBJECTS =
	typeof document === "undefined"
		? // If we're not in a browser context, skip checking for support on DOM nodes
		  true
		: tryNativeGetOwnPropertyDescriptor(document.createElement("div"));

const CAN_USE_NATIVE_GET_OWN_PROPERTY_DESCRIPTOR = WORKS_ON_OBJECTS && WORKS_ON_DOM_OBJECTS;

const nativeGetOwnPropertyDescriptor =
	Object.getOwnPropertyDescriptor != null && Object.getOwnPropertyDescriptor.toString().indexOf("[native code]") >= 0 ? Object.getOwnPropertyDescriptor : undefined;

const SUPPORTS_ACCESSORS = "__defineGetter__" in Object.prototype;
const {__lookupGetter__, __lookupSetter__} = Object.prototype as typeof Object.prototype & {
	__lookupGetter__: Function;
	__lookupSetter__: Function;
};

const DEFAULT_DESCRIPTOR_OPTIONS: PropertyDescriptor = {
	writable: true,
	configurable: true,
	enumerable: true
};

/**
 * @param {O} O
 * @param {PropertyKey} P
 * @returns {InternalPropertyDescriptor?}
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinarygetownproperty
 */
export function OrdinaryGetOwnProperty<O extends {}>(O: O, P: PropertyKey): InternalPropertyDescriptor | undefined {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Given argument ${errorFormatArgument(P)} must be a PropertyKey`, TypeError);

	// If O does not have an own property with key P, return undefined.
	if (!OBJECT_PROTOTYPE_HAS_OWN_PROPERTY.call(O, P)) {
		return undefined;
	}

	// Let D be a newly created Property Descriptor with no fields.
	const D = {} as InternalPropertyDescriptor;

	// Let X be O's own property whose key is P.
	let X: InternalPropertyDescriptor | undefined;

	// If Object.getOwnPropertyDescriptor is natively available, use that one directly
	if (CAN_USE_NATIVE_GET_OWN_PROPERTY_DESCRIPTOR && nativeGetOwnPropertyDescriptor != null) {
		X = toInternalPropertyDescriptor(nativeGetOwnPropertyDescriptor(O, P));
	} else {
		const existingInternalPropertyDescriptor = internals(O)["__[[PropertyAttributes]]__"][P as string | number] as InternalPropertyDescriptor | undefined;
		const existingDescriptorOptions: PropertyDescriptor =
			existingInternalPropertyDescriptor == null
				? {}
				: {
						...("[[Writable]]" in existingInternalPropertyDescriptor ? {writable: existingInternalPropertyDescriptor["[[Writable]]"]} : {}),
						...("[[Configurable]]" in existingInternalPropertyDescriptor ? {configurable: existingInternalPropertyDescriptor["[[Configurable]]"]} : {}),
						...("[[Enumerable]]" in existingInternalPropertyDescriptor ? {enumerable: existingInternalPropertyDescriptor["[[Enumerable]]"]} : {})
				  };

		let getter: ArbitraryFunction | undefined;
		let setter: ArbitraryFunction | undefined;

		// Otherwise, if the engine supports accessors,
		// look up the get- and set accessors
		if (SUPPORTS_ACCESSORS) {
			getter = __lookupGetter__.call(O, P);
			setter = __lookupSetter__.call(O, P);
		}

		// If a getter or setter exists, it is an AccessorDescriptor
		if (getter != null || setter != null) {
			X = toInternalPropertyDescriptor({
				...DEFAULT_DESCRIPTOR_OPTIONS,
				...existingDescriptorOptions,
				...(getter == null ? {} : {get: getter}),
				...(setter == null ? {} : {set: setter})
			});
		}

		// Otherwise, it is a DataDescriptor
		else {
			X = toInternalPropertyDescriptor({
				...DEFAULT_DESCRIPTOR_OPTIONS,
				...existingDescriptorOptions,
				value: O[P as keyof O]
			});
		}
	}

	// If X is a data property, then
	if (IsDataDescriptor(X)) {
		// Set D.[[Value]] to the value of X's [[Value]] attribute.
		D["[[Value]]"] = X["[[Value]]"];

		// Set D.[[Writable]] to the value of X's [[Writable]] attribute.
		D["[[Writable]]"] = X["[[Writable]]"];
	}

	// Else,
	else {
		// Assert: X is an accessor property.
		assert(IsAccessorDescriptor(X), `X must be an Accessor Property`);

		// Set D.[[Get]] to the value of X's [[Get]] attribute.
		D["[[Get]]"] = X!["[[Get]]"];

		// Set D.[[Set]] to the value of X's [[Set]] attribute.
		D["[[Set]]"] = X!["[[Set]]"];
	}

	// Set D.[[Enumerable]] to the value of X's [[Enumerable]] attribute.
	D["[[Enumerable]]"] = X!["[[Enumerable]]"];

	// Set D.[[Configurable]] to the value of X's [[Configurable]] attribute.
	D["[[Configurable]]"] = X!["[[Configurable]]"];

	internals(O)["__[[PropertyAttributes]]__"][P as string | number] = D;

	// Return D.
	return D;
}
