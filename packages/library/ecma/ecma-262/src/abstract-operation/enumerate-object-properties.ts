import {internals} from "../lib/internal-slot-map/internals";
import {makeList} from "../lib/list/list";
import {CreateIterResultObject} from "./create-iter-result-object";

/**
 * https://tc39.es/ecma262/#sec-enumerate-object-properties
 * @param {T} obj
 */
export function EnumerateObjectProperties<T>(obj: T): Iterator<PropertyKey, any> {
	const visited = makeList<PropertyKey>();
	const ownKeys = internals(obj)["[[OwnPropertyKeys]]"]();

	return {
		next(): IteratorResult<PropertyKey> {
			for (let i = 0; i < ownKeys.length; i++) {
				const key = ownKeys.get(i);
				if (typeof key === "symbol") continue;

				const desc = internals(obj)["[[GetOwnProperty]]"](key);
				if (desc !== undefined && !visited.has(key)) {
					visited.append(key);
					if (desc["[[Enumerable]]"] === true) {
						return CreateIterResultObject(key, false);
					}
				}
			}

			const proto = internals(obj)["[[GetPrototypeOf]]"]();

			if (proto === null) {
				return CreateIterResultObject<PropertyKey>(undefined, true);
			}

			const protoResult = EnumerateObjectProperties(proto);
			while (true) {
				const {value, done} = protoResult.next();
				if (done) break;
				if (!visited.has(value)) {
					return CreateIterResultObject(value, false);
				}
			}

			return CreateIterResultObject<PropertyKey>(undefined, true);
		}
	};
}
