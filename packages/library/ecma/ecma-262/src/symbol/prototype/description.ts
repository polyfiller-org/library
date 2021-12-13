import {internals} from "../../lib/internal-slot-map/internals";
import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {thisSymbolValue} from "../../abstract-operation/this-symbol-value";

/**
 * https://tc39.es/ecma262/#sec-symbol.prototype.description
 */
export const symbolPrototypeDescription = (
	OrdinaryGetOwnProperty(
		{
			get description(): string | undefined {
				// Let s be the this value.
				const s = this as symbol;

				// Let sym be ? thisSymbolValue(s).
				const sym = thisSymbolValue(s);

				// Return sym.[[Description]].
				return internals(sym)["[[Description]]"];
			}
		},
		"description"
	) as InternalGetAccessorDescriptor
)["[[Get]]"];
