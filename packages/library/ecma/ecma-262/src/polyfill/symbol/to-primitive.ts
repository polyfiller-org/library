import {SUPPORTS_SYMBOL_TO_PRIMITIVE} from "../../support/symbol/to-primitive";
import {patchSymbolToPrimitive} from "../../patch/symbol/to-primitive";

if (!SUPPORTS_SYMBOL_TO_PRIMITIVE) {
	patchSymbolToPrimitive();
}
