import {OrdinaryPreventExtensions} from "../../abstract-operation/ordinary-prevent-extensions";

/**
 * https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-preventextensions
 * @private
 */
export function __PreventExtensions__(this: object) {
	// Return ! OrdinaryPreventExtensions(O).
	return OrdinaryPreventExtensions(this);
}
