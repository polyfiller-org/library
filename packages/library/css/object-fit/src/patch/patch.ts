import {observe} from "../observe/observe";
import {fixVideo} from "../fix/fix-video";
import {fixImage} from "../fix/fix-image";

/**
 * Applies the polyfill
 */
export function patch(): void {
	observe("img", fixImage);
	observe("video", fixVideo);
}
