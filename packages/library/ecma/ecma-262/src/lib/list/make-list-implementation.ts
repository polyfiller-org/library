import {List} from "./list";
import {createObjectWithPrototype} from "../../util/create-object-with-prototype";
import {MATH_2_TO_THE_POWER_OF_32_MINUS_1} from "../../constant/math-constant";

const {assertArrayIndex} = {
	assertArrayIndex(index: number): void {
		// Index must always a nonnegative integer less than 2^32 - 1
		if (index < 0) throw new RangeError();
		if (index >= MATH_2_TO_THE_POWER_OF_32_MINUS_1) throw new RangeError();
	}
};

const {setLength} = {
	setLength<T>(list: List<T>, length: number): void {
		((list as unknown) as {length: number}).length = length;
	}
};

const ListImplementationPrototype = createObjectWithPrototype<List>(null);

const {set} = {
	set<T>(this: List<T>, index: number, item: T): void {
		assertArrayIndex(index);
		(this as any)[index] = item;
		if (index >= this.length) {
			setLength(this, index + 1);
		}
	}
};

const {get} = {
	get<T>(this: List<T>, index: number): T {
		assertArrayIndex(index);
		if (index >= this.length) throw new RangeError();
		return (this as any)[index];
	}
};

const {append} = {
	append<T>(this: List<T>, item: T): void {
		this.set(this.length, item);
	}
};

const {has} = {
	has<T>(this: List<T>, item: T): boolean {
		return this.indexOf(item) >= 0;
	}
};

const {clear} = {
	clear<T>(this: List<T>): void {
		const length = this.length;
		for (let i = 0; i < length; i++) {
			delete (this as any)[i];
		}
		setLength(this, 0);
	}
};

const {del} = {
	del<T>(this: List<T>, item: T): boolean {
		return this.deleteIndex(this.indexOf(item));
	}
};

const {deleteIndex} = {
	deleteIndex<T>(this: List<T>, index: number): boolean {
		if (index < 0) return false;

		// Delete the property pointing to the item
		delete (this as any)[index];

		for (let i = index; i < this.length; i++) {
			if (Object.prototype.hasOwnProperty.call(this, i + 1)) {
				this.set(i, (this as any)[i + 1]);
			}
		}

		// Subtract one from the List length
		setLength(this, this.length - 1);
		return true;
	}
};

const {indexOf} = {
	indexOf<T>(this: List<T>, item: T): 0 | -1 {
		let cur = 0;
		const length = this.length;
		while (cur < length) {
			try {
				if ((this as any)[cur] === item) {
					return cur as 0;
				}
			} catch {}

			cur++;
		}

		return -1;
	}
};

const {some} = {
	some<T>(this: List<T>, cb: (item: T, index: number, list: List<T>) => boolean): boolean {
		const length = this.length;
		for (let i = 0; i < length; i++) {
			const cur = (this as any)[i];
			if (cb(cur, i, (this as unknown) as List<T>)) {
				return true;
			}
		}

		return false;
	}
};

ListImplementationPrototype.set = set;
ListImplementationPrototype.get = get;
ListImplementationPrototype.append = append;
ListImplementationPrototype.has = has;
ListImplementationPrototype.delete = del;
ListImplementationPrototype.deleteIndex = deleteIndex;
ListImplementationPrototype.clear = clear;
ListImplementationPrototype.indexOf = indexOf;
ListImplementationPrototype.some = some;

export function makeListImplementation<A>(): List<A> {
	const list = createObjectWithPrototype<List<A>>(ListImplementationPrototype);
	setLength(list, 0);
	for (let i = 0; i < arguments.length; i++) {
		list.set(i, arguments[i]);
	}

	return list;
}
