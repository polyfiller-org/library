import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {OrdinaryHasInstance} from "../../abstract-operation/ordinary-has-instance";

/**
 * The value of the name property of this function is "[Symbol.hasInstance]".
 * https://tc39.es/ecma262/#sec-function.prototype-@@hasinstance
 * @return {ArrayConstructor}
 */
export const functionPrototypeSymbolHasInstance = () =>
	(OrdinaryGetOwnProperty(
		{
			"[Symbol.hasInstance]"(V: unknown): boolean {
				// Let F be the this value.
				const F = this;

				// Return ? OrdinaryHasInstance(F, V).
				return OrdinaryHasInstance(F, V);
			}
		},
		"[Symbol.hasInstance]"
	) as InternalGetAccessorDescriptor)["[[Value]]"];
