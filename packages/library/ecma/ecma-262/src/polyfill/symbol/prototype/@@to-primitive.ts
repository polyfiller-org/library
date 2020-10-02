import {SUPPORTS_SYMBOL_PROTOTYPE_SYMBOL_TO_PRIMITIVE} from "../../../support/symbol/prototype/@@to-primitive";
import {patchSymbolPrototypeSymbolToPrimitive} from "../../../patch/symbol/prototype/@@to-primitive";

if (!SUPPORTS_SYMBOL_PROTOTYPE_SYMBOL_TO_PRIMITIVE) {
	patchSymbolPrototypeSymbolToPrimitive();
}
