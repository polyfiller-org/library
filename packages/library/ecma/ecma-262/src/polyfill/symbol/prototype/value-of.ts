import {SUPPORTS_SYMBOL_PROTOTYPE_VALUE_OF} from "../../../support/symbol/prototype/value-of";
import {patchSymbolPrototypeValueOf} from "../../../patch/symbol/prototype/value-of";

if (!SUPPORTS_SYMBOL_PROTOTYPE_VALUE_OF) {
	patchSymbolPrototypeValueOf();
}
