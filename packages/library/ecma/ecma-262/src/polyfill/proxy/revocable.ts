import {SUPPORTS_PROXY_REVOCABLE} from "../../support/proxy/revocable";
import {patchProxyRevocable} from "../../patch/proxy/revocable";

if (!SUPPORTS_PROXY_REVOCABLE) {
	patchProxyRevocable();
}
