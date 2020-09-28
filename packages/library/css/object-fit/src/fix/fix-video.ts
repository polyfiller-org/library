import {SUPPORTS_OBJECT_FIT_FOR_VIDEOS} from "../support/supports-object-fit";
import {ExtendedHTMLVideoElement} from "../type/type";
import {fixElement} from "./fix-element";

export function fixVideo(target: ExtendedHTMLVideoElement): void {
	return fixElement({
		target,
		loadEvent: "loadedmetadata",
		kind: "video",
		isSupported: SUPPORTS_OBJECT_FIT_FOR_VIDEOS,
		isLoaded: () => target.readyState >= 1,
		getNaturalSize: () => ({naturalWidth: target.videoWidth, naturalHeight: target.videoHeight})
	});
}
