import {OrdinaryGetOwnProperty} from "../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../type/internal-property-descriptor";

/**
 * The value of the name property of this function is "get [Symbol.species]".
 * https://tc39.es/ecma262/#sec-get-map-@@species
 */
export const mapSymbolSpecies = () =>
	(
		OrdinaryGetOwnProperty(
			{
				get "[Symbol.species]"() {
					// Return the this value.
					return this;
				}
			},
			"[Symbol.species]"
		) as InternalGetAccessorDescriptor
	)["[[Get]]"];
