import {makeList} from "../list/list";

export class MapLike<Key, Value> {
	private readonly _keys = makeList<{}>();
	private readonly _values = makeList<Value>();

	get(key: Key): Value | undefined {
		const idx = this._keys.indexOf(key);
		return idx !== -1 ? this._values.get(idx) : undefined;
	}

	has(key: Key) {
		return this._keys.indexOf(key) !== -1;
	}

	set(key: Key, value: Value) {
		const idx = this._keys.indexOf(key);
		if (idx !== -1) {
			this._values.set(idx, value);
		} else {
			this._keys.append(key);
			this._values.append(value);
		}
		return this;
	}
}
