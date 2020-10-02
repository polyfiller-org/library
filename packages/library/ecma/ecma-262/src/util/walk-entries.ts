export type WalkEntriesCallback<T, Key extends keyof T> = (key: Key, value: T[Key]) => void;

export function walkEntries<T extends object>(record: T, callback: WalkEntriesCallback<T, keyof T>): void {
	for (const key in record) {
		if (!record.hasOwnProperty(key)) continue;
		callback(key, record[key]);
	}
}
