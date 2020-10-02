/**
 * The Hash function to use with HashTables and HashSets
 * @param {Key} key
 * @returns {number}
 */
export function hashFunction<Key>(key: Key): number {
	let hashValue = 0;
	const stringTypeKey = `${String(key)}${typeof key}`;

	for (let index = 0; index < stringTypeKey.length; index++) {
		const charCode = stringTypeKey.charCodeAt(index);
		hashValue += charCode << (index * 8);
	}

	return hashValue;
}
