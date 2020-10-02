import {SUPPORTS_SYMBOL_IS_CONCAT_SPREADABLE} from "../../support/symbol/is-concat-spreadable";
import {patchSymbolIsConcatSpreadable} from "../../patch/symbol/is-concat-spreadable";

if (!SUPPORTS_SYMBOL_IS_CONCAT_SPREADABLE) {
	patchSymbolIsConcatSpreadable();
}
