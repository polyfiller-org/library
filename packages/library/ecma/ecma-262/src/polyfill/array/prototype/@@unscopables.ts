import {SUPPORTS_ARRAY_PROTOTYPE_SYMBOL_UNSCOPABLES} from "../../../support/array/prototype/@@unscopables";
import {patchArrayPrototypeSymbolUnscopables} from "../../../patch/array/prototype/@@unscopables";

if (!SUPPORTS_ARRAY_PROTOTYPE_SYMBOL_UNSCOPABLES) {
	patchArrayPrototypeSymbolUnscopables();
}
