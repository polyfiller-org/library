import {ComputedStyleRecord} from "./computed-style-record";
import {IComputedStyleObserver} from "./i-computed-style-observer";

export type ComputedStyleCallback = (entries: ComputedStyleRecord[], observer: IComputedStyleObserver) => void;
