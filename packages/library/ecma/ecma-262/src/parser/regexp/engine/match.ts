/** `Match` is result data of regular expression pattern matching. */
export class Match {
	/** An input string of this matching. */
	readonly input: string;

	private readonly caps: number[];
	private readonly names: Map<string, number>;

	constructor(input: string, caps: number[], names: Map<string, number>) {
		this.input = input;
		this.caps = caps;
		this.names = names;
	}

	/** Return the initial index of this matching. */
	get index(): number {
		return this.caps[0];
	}

	/** Return the last index of this matching. */
	get lastIndex(): number {
		return this.caps[1];
	}

	/**
	 * Return number of capture group.
	 *
	 * This number contains capture `0` (whole matching) also.
	 */
	get length(): number {
		return this.caps.length / 2;
	}

	/** Get the capture `k`. */
	get(k: number | string): string | undefined {
		const [i, j] = this.resolve(k);
		if (i < 0 || j < 0) {
			return undefined;
		}

		return this.input.slice(i, j);
	}

	/** Get the begin index of the capture `k`. */
	begin(k: number | string): number | undefined {
		const i = this.resolve(k)[0];
		return i < 0 ? undefined : i;
	}

	/** Get the end index of the capture `k`. */
	end(k: number | string): number | undefined {
		const j = this.resolve(k)[1];
		return j < 0 ? undefined : j;
	}

	/**
	 * Resolve name to capture index.
	 *
	 * If not resolved, it returns `-1`.
	 */
	private resolve(k: number | string): [number, number] {
		if (typeof k === "string") {
			k = this.names.get(k) ?? -1;
		}
		return [this.caps[k * 2] ?? -1, this.caps[k * 2 + 1] ?? -1];
	}

	/** Convert this into `RegExp`'s result array. */
	toArray(): RegExpExecArray {
		// In TypeScript definition, `RegExpExecArray` extends `string[]`.
		// However the **real** `RegExpExecArray` can contain `undefined`.
		// So this method uses type casting to set properties.

		const array: (string | undefined)[] = [];
		(array as RegExpExecArray).index = this.index;
		(array as RegExpExecArray).input = this.input;
		array.length = this.length;

		for (let i = 0; i < this.length; i++) {
			array[i] = this.get(i);
		}

		if (this.names.size > 0) {
			const groups: {[key: string]: string | undefined} = Object.create(null);
			for (const [name, i] of this.names) {
				groups[name] = array[i];
			}

			// `RegExpExecArray`'s group does not accept `undefined` value, so cast to `any` for now.
			(array as any).groups = groups; // eslint-disable-line @typescript-eslint/no-explicit-any
		} else {
			(array as RegExpExecArray).groups = undefined;
		}

		return array as RegExpExecArray;
	}

	toString(): string {
		const array = this.toArray();
		const show = (x: string | undefined): string => (x === undefined ? "undefined" : JSON.stringify(x));
		return `Match[${array.map(show).join(", ")}]`;
	}
}
