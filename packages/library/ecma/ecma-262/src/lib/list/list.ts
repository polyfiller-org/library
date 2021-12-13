import {makeListImplementation} from "./make-list-implementation";

export interface List<T = unknown> {
	readonly length: number;
	readonly 0: T;

	set(index: 0, item: T): void;
	set(index: number, item: T): void;

	get(index: 0): T;
	get(index: number): T;

	delete(item: T): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T): void;

	indexOf(item: T): 0 | -1;
	indexOf(item: T): number;

	has(item: T): boolean;

	some(cb: (item: T, index: number, list: List<T>) => boolean): boolean;
}
export interface List2<T0, T1> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: number, item: T0 | T1): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: number): T0 | T1;

	delete(item: T0 | T1): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T0 | T1): number;

	has(item: T0 | T1): boolean;

	some(cb: (item: T0 | T1, index: number, list: List<T0 | T1>) => boolean): boolean;
}
export interface List3<T0, T1, T2> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: number, item: T0 | T1 | T2): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: number): T0 | T1 | T2;

	delete(item: T0 | T1 | T2): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T0 | T1 | T2): number;

	has(item: T0 | T1 | T2): boolean;

	some(cb: (item: T0 | T1 | T2, index: number, list: List<T0 | T1 | T2>) => boolean): boolean;
}
export interface List4<T0, T1, T2, T3> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: number, item: T0 | T1 | T2 | T3): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: number): T0 | T1 | T2 | T3;

	delete(item: T0 | T1 | T2 | T3): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T0 | T1 | T2 | T3): number;

	has(item: T0 | T1 | T2 | T3): boolean;

	some(cb: (item: T0 | T1 | T2 | T3, index: number, list: List<T0 | T1 | T2 | T3>) => boolean): boolean;
}
export interface List5<T0, T1, T2, T3, T4> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: number): T0 | T1 | T2 | T3 | T4;

	delete(item: T0 | T1 | T2 | T3 | T4): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4): number;

	has(item: T0 | T1 | T2 | T3 | T4): boolean;

	some(cb: (item: T0 | T1 | T2 | T3 | T4, index: number, list: List<T0 | T1 | T2 | T3 | T4>) => boolean): boolean;
}
export interface List6<T0, T1, T2, T3, T4, T5> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5): boolean;

	some(cb: (item: T0 | T1 | T2 | T3 | T4 | T5, index: number, list: List<T0 | T1 | T2 | T3 | T4 | T5>) => boolean): boolean;
}
export interface List7<T0, T1, T2, T3, T4, T5, T6> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6): boolean;

	some(cb: (item: T0 | T1 | T2 | T3 | T4 | T5 | T6, index: number, list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6>) => boolean): boolean;
}
export interface List8<T0, T1, T2, T3, T4, T5, T6, T7> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7): boolean;

	some(cb: (item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7, index: number, list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7>) => boolean): boolean;
}
export interface List9<T0, T1, T2, T3, T4, T5, T6, T7, T8> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8): boolean;

	some(cb: (item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, index: number, list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>) => boolean): boolean;
}
export interface List10<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	readonly 9: T9;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: 9, item: T9): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: 9): T9;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T9): 9 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9): boolean;

	some(cb: (item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9, index: number, list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>) => boolean): boolean;
}
export interface List11<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	readonly 9: T9;

	readonly 10: T10;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: 9, item: T9): void;
	set(index: 10, item: T10): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: 9): T9;
	get(index: 10): T10;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T9): 9 | -1;
	indexOf(item: T10): 10 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10): boolean;

	some(cb: (item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10, index: number, list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>) => boolean): boolean;
}
export interface List12<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	readonly 9: T9;

	readonly 10: T10;

	readonly 11: T11;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: 9, item: T9): void;
	set(index: 10, item: T10): void;
	set(index: 11, item: T11): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: 9): T9;
	get(index: 10): T10;
	get(index: 11): T11;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T9): 9 | -1;
	indexOf(item: T10): 10 | -1;
	indexOf(item: T11): 11 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11): boolean;

	some(
		cb: (item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11, index: number, list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11>) => boolean
	): boolean;
}
export interface List13<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	readonly 9: T9;

	readonly 10: T10;

	readonly 11: T11;

	readonly 12: T12;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: 9, item: T9): void;
	set(index: 10, item: T10): void;
	set(index: 11, item: T11): void;
	set(index: 12, item: T12): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: 9): T9;
	get(index: 10): T10;
	get(index: 11): T11;
	get(index: 12): T12;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T9): 9 | -1;
	indexOf(item: T10): 10 | -1;
	indexOf(item: T11): 11 | -1;
	indexOf(item: T12): 12 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12): boolean;

	some(
		cb: (
			item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12,
			index: number,
			list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12>
		) => boolean
	): boolean;
}
export interface List14<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	readonly 9: T9;

	readonly 10: T10;

	readonly 11: T11;

	readonly 12: T12;

	readonly 13: T13;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: 9, item: T9): void;
	set(index: 10, item: T10): void;
	set(index: 11, item: T11): void;
	set(index: 12, item: T12): void;
	set(index: 13, item: T13): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: 9): T9;
	get(index: 10): T10;
	get(index: 11): T11;
	get(index: 12): T12;
	get(index: 13): T13;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T9): 9 | -1;
	indexOf(item: T10): 10 | -1;
	indexOf(item: T11): 11 | -1;
	indexOf(item: T12): 12 | -1;
	indexOf(item: T13): 13 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13): boolean;

	some(
		cb: (
			item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13,
			index: number,
			list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13>
		) => boolean
	): boolean;
}
export interface List15<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	readonly 9: T9;

	readonly 10: T10;

	readonly 11: T11;

	readonly 12: T12;

	readonly 13: T13;

	readonly 14: T14;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: 9, item: T9): void;
	set(index: 10, item: T10): void;
	set(index: 11, item: T11): void;
	set(index: 12, item: T12): void;
	set(index: 13, item: T13): void;
	set(index: 14, item: T14): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: 9): T9;
	get(index: 10): T10;
	get(index: 11): T11;
	get(index: 12): T12;
	get(index: 13): T13;
	get(index: 14): T14;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T9): 9 | -1;
	indexOf(item: T10): 10 | -1;
	indexOf(item: T11): 11 | -1;
	indexOf(item: T12): 12 | -1;
	indexOf(item: T13): 13 | -1;
	indexOf(item: T14): 14 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14): boolean;

	some(
		cb: (
			item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14,
			index: number,
			list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14>
		) => boolean
	): boolean;
}
export interface List16<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15> {
	readonly length: number;
	readonly 0: T0;

	readonly 1: T1;

	readonly 2: T2;

	readonly 3: T3;

	readonly 4: T4;

	readonly 5: T5;

	readonly 6: T6;

	readonly 7: T7;

	readonly 8: T8;

	readonly 9: T9;

	readonly 10: T10;

	readonly 11: T11;

	readonly 12: T12;

	readonly 13: T13;

	readonly 14: T14;

	readonly 15: T15;

	set(index: 0, item: T0): void;
	set(index: 1, item: T1): void;
	set(index: 2, item: T2): void;
	set(index: 3, item: T3): void;
	set(index: 4, item: T4): void;
	set(index: 5, item: T5): void;
	set(index: 6, item: T6): void;
	set(index: 7, item: T7): void;
	set(index: 8, item: T8): void;
	set(index: 9, item: T9): void;
	set(index: 10, item: T10): void;
	set(index: 11, item: T11): void;
	set(index: 12, item: T12): void;
	set(index: 13, item: T13): void;
	set(index: 14, item: T14): void;
	set(index: 15, item: T15): void;
	set(index: number, item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15): void;

	get(index: 0): T0;
	get(index: 1): T1;
	get(index: 2): T2;
	get(index: 3): T3;
	get(index: 4): T4;
	get(index: 5): T5;
	get(index: 6): T6;
	get(index: 7): T7;
	get(index: 8): T8;
	get(index: 9): T9;
	get(index: 10): T10;
	get(index: 11): T11;
	get(index: 12): T12;
	get(index: 13): T13;
	get(index: 14): T14;
	get(index: 15): T15;
	get(index: number): T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15;

	delete(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15): boolean;

	deleteIndex(index: number): boolean;

	clear(): void;

	append(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15): void;

	indexOf(item: T0): 0 | -1;
	indexOf(item: T1): 1 | -1;
	indexOf(item: T2): 2 | -1;
	indexOf(item: T3): 3 | -1;
	indexOf(item: T4): 4 | -1;
	indexOf(item: T5): 5 | -1;
	indexOf(item: T6): 6 | -1;
	indexOf(item: T7): 7 | -1;
	indexOf(item: T8): 8 | -1;
	indexOf(item: T9): 9 | -1;
	indexOf(item: T10): 10 | -1;
	indexOf(item: T11): 11 | -1;
	indexOf(item: T12): 12 | -1;
	indexOf(item: T13): 13 | -1;
	indexOf(item: T14): 14 | -1;
	indexOf(item: T15): 15 | -1;
	indexOf(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15): number;

	has(item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15): boolean;

	some(
		cb: (
			item: T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15,
			index: number,
			list: List<T0 | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15>
		) => boolean
	): boolean;
}
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
	t0: T0,
	t1: T1,
	t2: T2,
	t3: T3,
	t4: T4,
	t5: T5,
	t6: T6,
	t7: T7,
	t8: T8,
	t9: T9,
	t10: T10,
	t11: T11,
	t12: T12,
	t13: T13,
	t14: T14,
	t15: T15
): List16<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
	t0: T0,
	t1: T1,
	t2: T2,
	t3: T3,
	t4: T4,
	t5: T5,
	t6: T6,
	t7: T7,
	t8: T8,
	t9: T9,
	t10: T10,
	t11: T11,
	t12: T12,
	t13: T13,
	t14: T14
): List15<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
	t0: T0,
	t1: T1,
	t2: T2,
	t3: T3,
	t4: T4,
	t5: T5,
	t6: T6,
	t7: T7,
	t8: T8,
	t9: T9,
	t10: T10,
	t11: T11,
	t12: T12,
	t13: T13
): List14<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
	t0: T0,
	t1: T1,
	t2: T2,
	t3: T3,
	t4: T4,
	t5: T5,
	t6: T6,
	t7: T7,
	t8: T8,
	t9: T9,
	t10: T10,
	t11: T11,
	t12: T12
): List13<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
	t0: T0,
	t1: T1,
	t2: T2,
	t3: T3,
	t4: T4,
	t5: T5,
	t6: T6,
	t7: T7,
	t8: T8,
	t9: T9,
	t10: T10,
	t11: T11
): List12<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
	t0: T0,
	t1: T1,
	t2: T2,
	t3: T3,
	t4: T4,
	t5: T5,
	t6: T6,
	t7: T7,
	t8: T8,
	t9: T9,
	t10: T10
): List11<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	t0: T0,
	t1: T1,
	t2: T2,
	t3: T3,
	t4: T4,
	t5: T5,
	t6: T6,
	t7: T7,
	t8: T8,
	t9: T9
): List10<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7, T8>(t0: T0, t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): List9<T0, T1, T2, T3, T4, T5, T6, T7, T8>;
export function makeList<T0, T1, T2, T3, T4, T5, T6, T7>(t0: T0, t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): List8<T0, T1, T2, T3, T4, T5, T6, T7>;
export function makeList<T0, T1, T2, T3, T4, T5, T6>(t0: T0, t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): List7<T0, T1, T2, T3, T4, T5, T6>;
export function makeList<T0, T1, T2, T3, T4, T5>(t0: T0, t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): List6<T0, T1, T2, T3, T4, T5>;
export function makeList<T0, T1, T2, T3, T4>(t0: T0, t1: T1, t2: T2, t3: T3, t4: T4): List5<T0, T1, T2, T3, T4>;
export function makeList<T0, T1, T2, T3>(t0: T0, t1: T1, t2: T2, t3: T3): List4<T0, T1, T2, T3>;
export function makeList<T0, T1, T2>(t0: T0, t1: T1, t2: T2): List3<T0, T1, T2>;
export function makeList<T0, T1>(t0: T0, t1: T1): List2<T0, T1>;
export function makeList<T>(t: T): List<T>;
export function makeList<T>(): List<T>;
export function makeList<T>(...elements: T[]): List<T>;
export function makeList<T>(this: {}): List<T> {
	return makeListImplementation.apply(this, arguments as unknown as []) as List<T>;
}
