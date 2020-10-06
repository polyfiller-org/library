import {SUPPORTS_PROXY} from "../../support/proxy/constructor";
import {patchProxyConstructor} from "../../patch/proxy/constructor";

if (!SUPPORTS_PROXY) {
	patchProxyConstructor();
}
