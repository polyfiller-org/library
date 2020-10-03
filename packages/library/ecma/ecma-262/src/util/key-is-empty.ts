import {safeHasOwnProperty} from "./safe-has-own-property";

export function keyIsEmpty<O, K extends keyof O>(obj: O, key: K): boolean {
	return !safeHasOwnProperty(obj, key);
}
