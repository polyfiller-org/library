import {SUPPORTS_PROXY} from "./constructor";

export const SUPPORTS_PROXY_REVOCABLE = SUPPORTS_PROXY && "revocable" in Proxy;
