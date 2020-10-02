import {SUPPORTS_SYMBOL_ASYNC_ITERATOR} from "../../support/symbol/async-iterator";
import {patchSymbolAsyncIterator} from "../../patch/symbol/async-iterator";

if (!SUPPORTS_SYMBOL_ASYNC_ITERATOR) {
	patchSymbolAsyncIterator();
}
