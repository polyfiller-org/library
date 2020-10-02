import {makeList} from "../list/list";

export class MapLike<Key, Value> {
	private _keys = makeList<{}>();
	private _values = makeList<Value>();

	public get(key: Key): Value | undefined {
		const idx = this._keys.indexOf(key);
		return idx !== -1 ? this._values.get(idx) : undefined;
	}

	public has(key: Key) {
		return this._keys.indexOf(key) !== -1;
	}

	public set(key: Key, value: Value) {
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
