import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {thisSymbolValue} from "../../abstract-operation/this-symbol-value";
import {SymbolDescriptiveString} from "../../abstract-operation/symbol-descriptive-string";

/**
 * The value of the name property of this function is "[Symbol.toPrimitive]".
 * https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
 */
export const symbolPrototypeSymbolToPrimitive = () =>
	(
		OrdinaryGetOwnProperty(
			{
				"[Symbol.toPrimitive]"(this: symbol, hint?: "default" | "number" | "string") {
					// Return ? thisSymbolValue(this value).
					if (hint == null) return thisSymbolValue(this);
					return SymbolDescriptiveString(thisSymbolValue(this));
				}
			},
			"[Symbol.toPrimitive]"
		) as InternalGetAccessorDescriptor
	)["[[Value]]"];
