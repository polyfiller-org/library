import {ToString} from "../../abstract-operation/to-string";
import {SortCompare} from "../../abstract-operation/sort-compare";

/**
 * This TimSort implementation is a TypeScript adaption of: https://raw.githubusercontent.com/mziccard/node-timsort/master/src/timsort.js
 */
export type CompareFunction<T, Y = T> = (a: T, b: Y) => number;

const HOLE_SYMBOL = "____$#HOLE$#____";

/**
 * Default minimum size of a run.
 */
const DEFAULT_MIN_MERGE = 32;

/**
 * Minimum ordered subsequence required to do galloping.
 */
const DEFAULT_MIN_GALLOPING = 7;

/**
 * Default tmp storage length. Can increase depending on the size of the
 * smallest run to merge.
 */
const DEFAULT_TMP_STORAGE_LENGTH = 256;

/**
 * Pre-computed powers of 10 for efficient lexicographic comparison of
 * small integers.
 */
const POWERS_OF_TEN = [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];

/**
 * Estimate the logarithm base 10 of a small integer.
 *
 * @param {number} x - The integer to estimate the logarithm of.
 * @return {number} - The estimated logarithm of the integer.
 */
function log10(x: number): number {
	if (x < 1e5) {
		if (x < 1e2) {
			return x < 1e1 ? 0 : 1;
		}

		if (x < 1e4) {
			return x < 1e3 ? 2 : 3;
		}

		return 4;
	}

	if (x < 1e7) {
		return x < 1e6 ? 5 : 6;
	}

	if (x < 1e9) {
		return x < 1e8 ? 7 : 8;
	}

	return 9;
}

/**
 * Default alphabetical comparison of items.
 *
 * @param {string|object|number} a - First element to compare.
 * @param {string|object|number} b - Second element to compare.
 * @return {number} - A positive number if a.toString() > b.toString(), a
 * negative number if .toString() < b.toString(), 0 otherwise.
 */
function alphabeticalCompare<T>(a: T | number, b: T | number): number {
	const aS = ToString(a);
	const bS = ToString(b);
	if (a === b || aS === bS) {
		return 0;
	}

	if (~~a === a && ~~b === b) {
		if (a === 0 || b === 0) {
			return a < b ? -1 : 1;
		}

		if (a < 0 || b < 0) {
			if (b >= 0) {
				return -1;
			}

			if (a >= 0) {
				return 1;
			}

			a = -a;
			b = -b;
		}

		const al = log10(a);
		const bl = log10(b);

		let t = 0;

		if (al < bl) {
			a *= POWERS_OF_TEN[bl - al - 1];
			b /= 10;
			t = -1;
		} else if (al > bl) {
			b *= POWERS_OF_TEN[al - bl - 1];
			a /= 10;
			t = 1;
		}

		if (a === b) {
			return t;
		}

		return a < b ? -1 : 1;
	}

	let aStr = ToString(a);
	let bStr = ToString(b);

	if (aStr === bStr) {
		return 0;
	}

	return aStr < bStr ? -1 : 1;
}

function sortCompareWithHoles<T, Y = T>(a: T, b: Y, comparefn?: CompareFunction<T, Y>): number {
	if ((a as T|string) === HOLE_SYMBOL && (b as Y|string) === HOLE_SYMBOL) {
		return 0;
	}

	if ((a as T|string) === HOLE_SYMBOL) {
		return 1;
	}

	if ((b as Y|string) === HOLE_SYMBOL) {
		return -1;
	}

	return SortCompare(a, b, comparefn);
}

function minRunLength(n: number) {
	let r = 0;

	while (n >= DEFAULT_MIN_MERGE) {
		r |= n & 1;
		n >>= 1;
	}

	return n + r;
}

function makeAscendingRun<T>(array: T[], lo: number, hi: number, compare: CompareFunction<T> | undefined) {
	let runHi = lo + 1;

	if (runHi === hi) {
		return 1;
	}

	// Descending
	if (sortCompareWithHoles(array[runHi++], array[lo], compare) < 0) {
		while (runHi < hi && sortCompareWithHoles(array[runHi], array[runHi - 1], compare) < 0) {
			runHi++;
		}

		reverseRun(array, lo, runHi);
		// Ascending
	} else {
		while (runHi < hi && sortCompareWithHoles(array[runHi], array[runHi - 1], compare) >= 0) {
			runHi++;
		}
	}

	return runHi - lo;
}

function reverseRun<T>(array: T[], lo: number, hi: number) {
	hi--;

	while (lo < hi) {
		let t = array[lo];
		array[lo++] = array[hi];
		array[hi--] = t;
	}
}

function binaryInsertionSort<T>(array: T[], lo: number, hi: number, start: number, compare: CompareFunction<T> | undefined) {
	if (start === lo) {
		start++;
	}

	for (; start < hi; start++) {
		let pivot = array[start];

		// Ranges of the array where pivot belongs
		let left = lo;
		let right = start;

		/*
		 *   pivot >= array[i] for i in [lo, left)
		 *   pivot <  array[i] for i in  in [right, start)
		 */
		while (left < right) {
			let mid = (left + right) >>> 1;

			if (sortCompareWithHoles(pivot, array[mid], compare) < 0) {
				right = mid;
			} else {
				left = mid + 1;
			}
		}

		/*
		 * Move elements right to make room for the pivot. If there are elements
		 * equal to pivot, left points to the first slot after them: this is also
		 * a reason for which TimSort is stable
		 */
		let n = start - left;
		// Switch is just an optimization for small arrays
		switch (n) {
			case 3:
				array[left + 3] = array[left + 2];
			/* falls through */
			case 2:
				array[left + 2] = array[left + 1];
			/* falls through */
			case 1:
				array[left + 1] = array[left];
				break;
			default:
				while (n > 0) {
					array[left + n] = array[left + n - 1];
					n--;
				}
		}

		array[left] = pivot;
	}
}

function gallopLeft<T>(value: T, array: T[], start: number, length: number, hint: number, compare: CompareFunction<T> | undefined) {
	let lastOffset = 0;
	let maxOffset = 0;
	let offset = 1;

	if (sortCompareWithHoles(value, array[start + hint], compare) > 0) {
		maxOffset = length - hint;

		while (offset < maxOffset && sortCompareWithHoles(value, array[start + hint + offset], compare) > 0) {
			lastOffset = offset;
			offset = (offset << 1) + 1;

			if (offset <= 0) {
				offset = maxOffset;
			}
		}

		if (offset > maxOffset) {
			offset = maxOffset;
		}

		// Make offsets relative to start
		lastOffset += hint;
		offset += hint;

		// value <= array[start + hint]
	} else {
		maxOffset = hint + 1;
		while (offset < maxOffset && sortCompareWithHoles(value, array[start + hint - offset], compare) <= 0) {
			lastOffset = offset;
			offset = (offset << 1) + 1;

			if (offset <= 0) {
				offset = maxOffset;
			}
		}
		if (offset > maxOffset) {
			offset = maxOffset;
		}

		// Make offsets relative to start
		let tmp = lastOffset;
		lastOffset = hint - offset;
		offset = hint - tmp;
	}

	/*
	 * Now array[start+lastOffset] < value <= array[start+offset], so value
	 * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
	 * binary search, with invariant array[start + lastOffset - 1] < value <=
	 * array[start + offset].
	 */
	lastOffset++;
	while (lastOffset < offset) {
		let m = lastOffset + ((offset - lastOffset) >>> 1);

		if (sortCompareWithHoles(value, array[start + m], compare) > 0) {
			lastOffset = m + 1;
		} else {
			offset = m;
		}
	}
	return offset;
}

function gallopRight<T>(value: T, array: T[], start: number, length: number, hint: number, compare: CompareFunction<T> | undefined) {
	let lastOffset = 0;
	let maxOffset = 0;
	let offset = 1;

	if (sortCompareWithHoles(value, array[start + hint], compare) < 0) {
		maxOffset = hint + 1;

		while (offset < maxOffset && sortCompareWithHoles(value, array[start + hint - offset], compare) < 0) {
			lastOffset = offset;
			offset = (offset << 1) + 1;

			if (offset <= 0) {
				offset = maxOffset;
			}
		}

		if (offset > maxOffset) {
			offset = maxOffset;
		}

		// Make offsets relative to start
		let tmp = lastOffset;
		lastOffset = hint - offset;
		offset = hint - tmp;

		// value >= array[start + hint]
	} else {
		maxOffset = length - hint;

		while (offset < maxOffset && sortCompareWithHoles(value, array[start + hint + offset], compare) >= 0) {
			lastOffset = offset;
			offset = (offset << 1) + 1;

			if (offset <= 0) {
				offset = maxOffset;
			}
		}

		if (offset > maxOffset) {
			offset = maxOffset;
		}

		// Make offsets relative to start
		lastOffset += hint;
		offset += hint;
	}

	lastOffset++;

	while (lastOffset < offset) {
		let m = lastOffset + ((offset - lastOffset) >>> 1);

		if (sortCompareWithHoles(value, array[start + m], compare) < 0) {
			offset = m;
		} else {
			lastOffset = m + 1;
		}
	}

	return offset;
}

class TimSort<T> {
	private minGallop: number = DEFAULT_MIN_GALLOPING;
	private readonly length: number;
	private readonly tmpStorageLength: number = DEFAULT_TMP_STORAGE_LENGTH;
	private readonly tmp: T[];
	private readonly stackLength: number = 0;
	private readonly runStart: number[];
	private readonly runLength: number[];
	private stackSize: number = 0;

	constructor(private readonly array: T[], private readonly compare: CompareFunction<T> | undefined) {
		this.length = array.length;

		if (this.length < DEFAULT_TMP_STORAGE_LENGTH * 2) {
			this.tmpStorageLength = this.length >>> 1;
		}

		this.tmp = new Array(this.tmpStorageLength);

		this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40;

		this.runStart = new Array(this.stackLength);
		this.runLength = new Array(this.stackLength);
	}

	public pushRun(runStart: number, runLength: number): void {
		this.runStart[this.stackSize] = runStart;
		this.runLength[this.stackSize] = runLength;
		this.stackSize += 1;
	}

	public mergeRuns(): void {
		while (this.stackSize > 1) {
			let n = this.stackSize - 2;

			if (
				(n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1]) ||
				(n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1])
			) {
				if (this.runLength[n - 1] < this.runLength[n + 1]) {
					n--;
				}
			} else if (this.runLength[n] > this.runLength[n + 1]) {
				break;
			}
			this.mergeAt(n);
		}
	}

	public forceMergeRuns(): void {
		while (this.stackSize > 1) {
			let n = this.stackSize - 2;

			if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
				n--;
			}

			this.mergeAt(n);
		}
	}

	private mergeAt(i: number): void {
		let compare = this.compare;
		let array = this.array;

		let start1 = this.runStart[i];
		let length1 = this.runLength[i];
		let start2 = this.runStart[i + 1];
		let length2 = this.runLength[i + 1];

		this.runLength[i] = length1 + length2;

		if (i === this.stackSize - 3) {
			this.runStart[i + 1] = this.runStart[i + 2];
			this.runLength[i + 1] = this.runLength[i + 2];
		}

		this.stackSize--;

		/*
		 * Find where the first element in the second run goes in run1. Previous
		 * elements in run1 are already in place
		 */
		let k = gallopRight(array[start2], array, start1, length1, 0, compare);
		start1 += k;
		length1 -= k;

		if (length1 === 0) {
			return;
		}

		/*
		 * Find where the last element in the first run goes in run2. Next elements
		 * in run2 are already in place
		 */
		length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

		if (length2 === 0) {
			return;
		}

		/*
		 * Merge remaining runs. A tmp array with length = min(length1, length2) is
		 * used
		 */
		if (length1 <= length2) {
			this.mergeLow(start1, length1, start2, length2);
		} else {
			this.mergeHigh(start1, length1, start2, length2);
		}
	}

	private mergeLow(start1: number, length1: number, start2: number, length2: number): void {
		let compare = this.compare;
		let array = this.array;
		let tmp = this.tmp;
		let i = 0;

		for (i = 0; i < length1; i++) {
			tmp[i] = array[start1 + i];
		}

		let cursor1 = 0;
		let cursor2 = start2;
		let dest = start1;

		array[dest++] = array[cursor2++];

		if (--length2 === 0) {
			for (i = 0; i < length1; i++) {
				array[dest + i] = tmp[cursor1 + i];
			}
			return;
		}

		if (length1 === 1) {
			for (i = 0; i < length2; i++) {
				array[dest + i] = array[cursor2 + i];
			}
			array[dest + length2] = tmp[cursor1];
			return;
		}

		let minGallop = this.minGallop;

		while (true) {
			let count1 = 0;
			let count2 = 0;
			let exit = false;

			do {
				if (sortCompareWithHoles(array[cursor2], tmp[cursor1], compare) < 0) {
					array[dest++] = array[cursor2++];
					count2++;
					count1 = 0;

					if (--length2 === 0) {
						exit = true;
						break;
					}
				} else {
					array[dest++] = tmp[cursor1++];
					count1++;
					count2 = 0;
					if (--length1 === 1) {
						exit = true;
						break;
					}
				}
			} while ((count1 | count2) < minGallop);

			if (exit) {
				break;
			}

			do {
				count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

				if (count1 !== 0) {
					for (i = 0; i < count1; i++) {
						array[dest + i] = tmp[cursor1 + i];
					}

					dest += count1;
					cursor1 += count1;
					length1 -= count1;
					if (length1 <= 1) {
						exit = true;
						break;
					}
				}

				array[dest++] = array[cursor2++];

				if (--length2 === 0) {
					exit = true;
					break;
				}

				count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

				if (count2 !== 0) {
					for (i = 0; i < count2; i++) {
						array[dest + i] = array[cursor2 + i];
					}

					dest += count2;
					cursor2 += count2;
					length2 -= count2;

					if (length2 === 0) {
						exit = true;
						break;
					}
				}
				array[dest++] = tmp[cursor1++];

				if (--length1 === 1) {
					exit = true;
					break;
				}

				minGallop--;
			} while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

			if (exit) {
				break;
			}

			if (minGallop < 0) {
				minGallop = 0;
			}

			minGallop += 2;
		}

		this.minGallop = minGallop;

		if (minGallop < 1) {
			this.minGallop = 1;
		}

		if (length1 === 1) {
			for (i = 0; i < length2; i++) {
				array[dest + i] = array[cursor2 + i];
			}
			array[dest + length2] = tmp[cursor1];
		} else if (length1 === 0) {
			throw new Error("mergeLow preconditions were not respected");
		} else {
			for (i = 0; i < length1; i++) {
				array[dest + i] = tmp[cursor1 + i];
			}
		}
	}

	private mergeHigh(start1: number, length1: number, start2: number, length2: number): void {
		let compare = this.compare;
		let array = this.array;
		let tmp = this.tmp;
		let i = 0;

		for (i = 0; i < length2; i++) {
			tmp[i] = array[start2 + i];
		}

		let cursor1 = start1 + length1 - 1;
		let cursor2 = length2 - 1;
		let dest = start2 + length2 - 1;
		let customCursor = 0;
		let customDest = 0;

		array[dest--] = array[cursor1--];

		if (--length1 === 0) {
			customCursor = dest - (length2 - 1);

			for (i = 0; i < length2; i++) {
				array[customCursor + i] = tmp[i];
			}

			return;
		}

		if (length2 === 1) {
			dest -= length1;
			cursor1 -= length1;
			customDest = dest + 1;
			customCursor = cursor1 + 1;

			for (i = length1 - 1; i >= 0; i--) {
				array[customDest + i] = array[customCursor + i];
			}

			array[dest] = tmp[cursor2];
			return;
		}

		let minGallop = this.minGallop;

		while (true) {
			let count1 = 0;
			let count2 = 0;
			let exit = false;

			do {
				if (sortCompareWithHoles(tmp[cursor2], array[cursor1], compare) < 0) {
					array[dest--] = array[cursor1--];
					count1++;
					count2 = 0;
					if (--length1 === 0) {
						exit = true;
						break;
					}
				} else {
					array[dest--] = tmp[cursor2--];
					count2++;
					count1 = 0;
					if (--length2 === 1) {
						exit = true;
						break;
					}
				}
			} while ((count1 | count2) < minGallop);

			if (exit) {
				break;
			}

			do {
				count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

				if (count1 !== 0) {
					dest -= count1;
					cursor1 -= count1;
					length1 -= count1;
					customDest = dest + 1;
					customCursor = cursor1 + 1;

					for (i = count1 - 1; i >= 0; i--) {
						array[customDest + i] = array[customCursor + i];
					}

					if (length1 === 0) {
						exit = true;
						break;
					}
				}

				array[dest--] = tmp[cursor2--];

				if (--length2 === 1) {
					exit = true;
					break;
				}

				count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

				if (count2 !== 0) {
					dest -= count2;
					cursor2 -= count2;
					length2 -= count2;
					customDest = dest + 1;
					customCursor = cursor2 + 1;

					for (i = 0; i < count2; i++) {
						array[customDest + i] = tmp[customCursor + i];
					}

					if (length2 <= 1) {
						exit = true;
						break;
					}
				}

				array[dest--] = array[cursor1--];

				if (--length1 === 0) {
					exit = true;
					break;
				}

				minGallop--;
			} while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

			if (exit) {
				break;
			}

			if (minGallop < 0) {
				minGallop = 0;
			}

			minGallop += 2;
		}

		this.minGallop = minGallop;

		if (minGallop < 1) {
			this.minGallop = 1;
		}

		if (length2 === 1) {
			dest -= length1;
			cursor1 -= length1;
			customDest = dest + 1;
			customCursor = cursor1 + 1;

			for (i = length1 - 1; i >= 0; i--) {
				array[customDest + i] = array[customCursor + i];
			}

			array[dest] = tmp[cursor2];
		} else if (length2 === 0) {
			throw new Error("mergeHigh preconditions were not respected");
		} else {
			customCursor = dest - (length2 - 1);
			for (i = 0; i < length2; i++) {
				array[customCursor + i] = tmp[i];
			}
		}
	}
}

function replaceHoles<T>(array: T[]): void {
	let firstHoleIndex: number | undefined;
	for (let i = array.length - 1; i >= 0; i--) {
		if (((array[i] as unknown) as string) === HOLE_SYMBOL) {
			firstHoleIndex = i;
		} else {
			break;
		}
	}
	if (firstHoleIndex === undefined) {
		return;
	}

	// Make holes on all positions from the first hole and onto the end
	for (let i = firstHoleIndex; i < array.length; i++) {
		delete array[i];
	}
}

export function timSort<T>(array: T[], comparefn: CompareFunction<T> = alphabeticalCompare, lo: number = 0, hi: number = array.length): void {
	let remaining = hi - lo;

	// The array is already sorted
	if (remaining < 2) {
		return;
	}

	let hasHole = false;

	// Loop through the array once to spot holes
	for (let i = 0; i < array.length; i++) {
		if (!array.hasOwnProperty(ToString(i))) {
			hasHole = true;
			array[i] = (HOLE_SYMBOL as unknown) as T;
		}
	}

	let runLength = 0;
	// On small arrays binary sort can be used directly
	if (remaining < DEFAULT_MIN_MERGE) {
		runLength = makeAscendingRun(array, lo, hi, comparefn);
		binaryInsertionSort(array, lo, hi, lo + runLength, comparefn);
		if (hasHole) replaceHoles(array);
		return;
	}

	let ts = new TimSort(array, comparefn);

	let minRun = minRunLength(remaining);

	do {
		runLength = makeAscendingRun(array, lo, hi, comparefn);
		if (runLength < minRun) {
			let force = remaining;
			if (force > minRun) {
				force = minRun;
			}

			binaryInsertionSort(array, lo, lo + force, lo + runLength, comparefn);
			runLength = force;
		}
		// Push new run and merge if necessary
		ts.pushRun(lo, runLength);
		ts.mergeRuns();

		// Go find next run
		remaining -= runLength;
		lo += runLength;
	} while (remaining !== 0);

	// Force merging of remaining runs
	ts.forceMergeRuns();

	if (hasHole) {
		replaceHoles(array);
	}
}
