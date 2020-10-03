import {assert} from "../../abstract-operation/assert";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {StringGetOwnProperty} from "../../abstract-operation/string-get-own-property";

/**
 * https://tc39.es/ecma262/#sec-string-exotic-objects-getownproperty-p
 */
export function __StringGetOwnProperty__<T extends string>(this: T, P: PropertyKey) {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 0 must be a PropertyKey`, TypeError);

	// Let desc be OrdinaryGetOwnProperty(S, P).
	const desc = OrdinaryGetOwnProperty(this, P);

	// If desc is not undefined, return desc.
	if (desc !== undefined) {
		return desc;
	}

	// Return ! StringGetOwnProperty(S, P).
	return StringGetOwnProperty(this, P);
}
