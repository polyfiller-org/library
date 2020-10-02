import {assert} from "./assert";
import {IsGenericDescriptor} from "./is-generic-descriptor";
import {IsDataDescriptor} from "./is-data-descriptor";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {OrdinaryGetOwnProperty} from "./ordinary-get-own-property";
import {SameValue} from "./same-value";
import {IsPropertyKey} from "./is-property-key";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

const NATIVE_DEFINE_PROPERTY =
	Object.defineProperty != null && Object.defineProperty.toString().indexOf("[native code]") >= 0 ? Object.defineProperty : undefined;
const SUPPORTS_ACCESSORS = "__defineGetter__" in Object.prototype;
const {__lookupGetter__, __lookupSetter__, __defineSetter__, __defineGetter__} = Object.prototype as typeof Object.prototype & {
	__lookupGetter__: Function;
	__lookupSetter__: Function;
	__defineGetter__: Function;
	__defineSetter__: Function;
};

function _createProperty<O extends {}, P extends PropertyKey>(o: O, p: P, desc: InternalPropertyDescriptor): void {
	if (NATIVE_DEFINE_PROPERTY != null) {
		NATIVE_DEFINE_PROPERTY(o, p, {
			...("[[Writable]]" in desc
				? {
						writable: desc["[[Writable]]"]
				  }
				: {}),
			...("[[Configurable]]" in desc
				? {
						configurable: desc["[[Configurable]]"]
				  }
				: {}),
			...("[[Enumerable]]" in desc
				? {
						enumerable: desc["[[Enumerable]]"]
				  }
				: {}),
			...("[[Value]]" in desc
				? {
						value: desc["[[Value]]"]
				  }
				: {}),
			...("[[Get]]" in desc
				? {
						get: desc["[[Get]]"]
				  }
				: {}),
			...("[[Set]]" in desc
				? {
						set: desc["[[Set]]"]
				  }
				: {})
		});
	} else if (IsDataDescriptor(desc)) {
		if (SUPPORTS_ACCESSORS && (__lookupGetter__.call(o, p) || __lookupSetter__.call(o, p))) {
			const prototype = ((o as unknown) as {__proto__: typeof Object.prototype}).__proto__;
			((o as unknown) as {__proto__: typeof Object.prototype}).__proto__ = Object.prototype;

			delete o[(p as unknown) as keyof O];
			o[(p as unknown) as keyof O] = desc["[[Value]]"];

			((o as unknown) as {__proto__: typeof prototype}).__proto__ = prototype;
			/* eslint-enable no-proto */
		} else {
			o[(p as unknown) as keyof O] = desc["[[Value]]"];
		}
	} else if (IsAccessorDescriptor(desc)) {
		if (!SUPPORTS_ACCESSORS) {
			throw new TypeError("Accessors are not supported by this runtime");
		}

		// If we got that far then getters and setters can be defined !!
		if ("[[Get]]" in desc) {
			__defineGetter__.call(o, p, desc["[[Get]]"]);
		}
		if ("[[Set]]" in desc) {
			__defineSetter__.call(o, p, desc["[[Set]]"]);
		}
	}

	internals(o)["__[[PropertyAttributes]]__"][p] = desc;
}

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-validateandapplypropertydescriptor
 * @param {O} O
 * @param {P} P
 * @param {boolean} extensible
 * @param {Desc} Desc
 * @param {PropertyDescriptor?} current
 * @returns {boolean}
 */
export function ValidateAndApplyPropertyDescriptor<O, P extends PropertyKey | undefined, Desc extends InternalPropertyDescriptor>(
	O: O,
	P: P,
	extensible: boolean,
	Desc: Desc,
	current: InternalPropertyDescriptor | undefined
): boolean {
	// Assert: If O is not undefined, then IsPropertyKey(P) is true.
	if (O !== undefined) {
		assert(IsPropertyKey(P), "Expected argument at position 1 to be a PropertyKey");
	}

	// If current is undefined, then
	if (current === undefined) {
		// If extensible is false, return false.
		if (extensible === false) return false;

		// Assert: extensible is true.
		assert(extensible === true, "Expected [[Extensible]] to be true");

		// If IsGenericDescriptor(Desc) is true or IsDataDescriptor(Desc) is true, then
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			// If O is not undefined, create an own data property named P of
			// object O whose [[Value]], [[Writable]], [[Enumerable]] and [[Configurable]]
			// attribute values are described by Desc.
			// If the value of an attribute field of Desc is absent,
			// the attribute of the newly created property is set to its default value.
			if (O !== undefined) {
				try {
					_createProperty(O, P as PropertyKey, Desc);
				} catch {
					// An error occurred. Return false to indicate that the operation was unsuccessful
					return false;
				}
			}
		}

		// Else Desc must be an accessor Property Descriptor,
		else {
			// If O is not undefined, create an own accessor property named P of object O whose
			// [[Get]], [[Set]], [[Enumerable]] and [[Configurable]] attribute values are described by Desc.
			// If the value of an attribute field of Desc is absent, the attribute of the newly created property is
			// set to its default value.
			if (O !== undefined) {
				try {
					_createProperty(O, P as PropertyKey, Desc);
				} catch {
					// An error occurred. Return false to indicate that the operation was unsuccessful
					return false;
				}
			}
		}

		// Return true.
		return true;
	}

	// If every field in Desc is absent, return true.
	if (
		!("[[Configurable]]" in Desc) &&
		!("[[Enumerable]]" in Desc) &&
		!("[[Writable]]" in Desc) &&
		!("[[Value]]" in Desc) &&
		!("[[Get]]" in Desc) &&
		!("[[Set]]" in Desc)
	) {
		return true;
	}

	// If current.[[Configurable]] is false, then
	if (current["[[Configurable]]"] === false) {
		// If Desc.[[Configurable]] is present and its value is true, return false.
		if ("[[Configurable]]" in Desc && Desc["[[Configurable]]"] === true) {
			return false;
		}

		// If Desc.[[Enumerable]] is present and the [[Enumerable]] fields of current and Desc are the Boolean negation of each other, return false.
		if ("[[Enumerable]]" in Desc && current["[[Enumerable]]"] === !Desc["[[Enumerable]]"]) {
			return false;
		}
	}

	// If IsGenericDescriptor(Desc) is true, no further validation is required.
	if (IsGenericDescriptor(Desc)) {
		// Nothing to do here
	}

	// Else if IsDataDescriptor(current) and IsDataDescriptor(Desc) have different results, then
	else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		// If current.[[Configurable]] is false, return false.
		if (current["[[Configurable]]"] === false) {
			return false;
		}

		const oDescriptor = OrdinaryGetOwnProperty(O, P as PropertyKey);

		// If IsDataDescriptor(current) is true, then
		if (IsDataDescriptor(current)) {
			// If O is not undefined, convert the property named P of object O from a data property to an accessor property.
			// Preserve the existing values of the converted property's [[Configurable]] and [[Enumerable]] attributes and
			// set the rest of the property's attributes to their default values.
			if (O !== undefined) {
				try {
					_createProperty(O, P as PropertyKey, {
						...(oDescriptor == null
							? {}
							: {
									"[[Configurable]]": oDescriptor["[[Configurable]]"],
									"[[Enumerable]]": oDescriptor["[[Enumerable]]"]
							  }),
						"[[Get]]"() {
							return oDescriptor == null ? undefined : oDescriptor["[[Value]]"];
						}
					});
				} catch {
					// An error occurred. Return false to indicate that the operation was unsuccessful
					return false;
				}
			}
		}

		// Else,
		else {
			// If O is not undefined, convert the property named P of object O from an accessor property to a data property.
			// Preserve the existing values of the converted property's [[Configurable]] and [[Enumerable]] attributes and
			// set the rest of the property's attributes to their default values.
			if (O !== undefined) {
				try {
					_createProperty(O, P as PropertyKey, {
						...(oDescriptor == null
							? {}
							: {
									"[[Configurable]]": oDescriptor["[[Configurable]]"],
									"[[Enumerable]]": oDescriptor["[[Enumerable]]"]
							  }),
						"[[Value]]": O[(P as unknown) as keyof O]
					});
				} catch {
					// An error occurred. Return false to indicate that the operation was unsuccessful
					return false;
				}
			}
		}
	}

	// Else if IsDataDescriptor(current) and IsDataDescriptor(Desc) are both true, then
	else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		// If current.[[Configurable]] is false and current.[[Writable]] is false, then
		if (current["[[Configurable]]"] === false && current["[[Writable]]"] === false) {
			// If Desc.[[Writable]] is present and Desc.[[Writable]] is true, return false.
			if ("[[Writable]]" in Desc && Desc["[[Writable]]"] === true) {
				return false;
			}

			// If Desc.[[Value]] is present and SameValue(Desc.[[Value]], current.[[Value]]) is false, return false.
			if ("[[Value]]" in Desc && !SameValue(Desc["[[Value]]"], current["[[Value]]"])) {
				return false;
			}

			// Return true.
			return true;
		}
	}

	// Else IsAccessorDescriptor(current) and IsAccessorDescriptor(Desc) are both true,
	else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		// If current.[[Configurable]] is false, then
		if (current["[[Configurable]]"] === false) {
			// If Desc.[[Set]] is present and SameValue(Desc.[[Set]], current.[[Set]]) is false, return false.
			if ("[[Set]]" in Desc && !SameValue(Desc["[[Set]]"], current["[[Set]]"])) {
				return false;
			}

			// If Desc.[[Get]] is present and SameValue(Desc.[[Get]], current.[[Get]]) is false, return false.
			if ("[[Get]]" in Desc && !SameValue(Desc["[[Get]]"], current["[[Get]]"])) {
				return false;
			}

			// Return true.
			return true;
		}
	}

	// If O is not undefined, then
	if (O !== undefined) {
		// For each field of Desc that is present,
		// set the corresponding attribute of the property named P of object O
		// to the value of the field.
		try {
			_createProperty(O, P as PropertyKey, Desc);
		} catch {
			// An error occurred. Return false to indicate that the operation was unsuccessful
			return false;
		}
	}

	// Return true.
	return true;
}
