import {safeHasOwnProperty} from "./safe-has-own-property";

export type WalkEntriesCallback<T, Key extends keyof T> = (key: Key, value: T[Key]) => void;

export function walkEntries<T extends object>(record: T, callback: WalkEntriesCallback<T, keyof T>): void {
	for (const key in record) {
		if (!safeHasOwnProperty(record, key)) continue;
		callback(key, record[key]);
	}
}
