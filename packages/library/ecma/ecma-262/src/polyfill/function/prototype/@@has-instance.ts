import {SUPPORTS_FUNCTION_PROTOTYPE_SYMBOL_HAS_INSTANCE} from "../../../support/function/prototype/@@has-instance";
import {patchFunctionPrototypeSymbolHasInstance} from "../../../patch/function/prototype/@@has-instance";

if (!SUPPORTS_FUNCTION_PROTOTYPE_SYMBOL_HAS_INSTANCE) {
	patchFunctionPrototypeSymbolHasInstance();
}
