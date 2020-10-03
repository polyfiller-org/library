import {assert} from "../../abstract-operation/assert";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {StringGetOwnProperty} from "../../abstract-operation/string-get-own-property";
import {IsCompatiblePropertyDescriptor} from "../../abstract-operation/is-compatible-property-descriptor";
import {InternalPropertyDescriptor} from "../../type/internal-property-descriptor";
import {internals} from "../../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-string-exotic-objects-defineownproperty-p-desc
 */
export function __StringDefineOwnProperty__<T extends string>(this: T, P: PropertyKey, Desc: InternalPropertyDescriptor) {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 0 must be a PropertyKey`, TypeError);

	// Let stringDesc be ! StringGetOwnProperty(S, P).
	const stringDesc = StringGetOwnProperty(this, P);

	// If stringDesc is not undefined, then
	if (stringDesc !== undefined) {
		// Let extensible be S.[[Extensible]].
		const extensible = internals(this)["[[Extensible]]"];

		// Return ! IsCompatiblePropertyDescriptor(extensible, Desc, stringDesc).
		return IsCompatiblePropertyDescriptor(extensible, Desc, stringDesc);
	}

	// Return ! OrdinaryDefineOwnProperty(S, P, Desc).
	return OrdinaryDefineOwnProperty(this, P, Desc);
}
