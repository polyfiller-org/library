export interface ShorthandSequenceReturnBase {
	some: boolean;
}

export interface ShorthandSequenceEmptyReturn extends ShorthandSequenceReturnBase {
	some: false;
}

export interface ShorthandSequenceSomeReturn<T> extends ShorthandSequenceReturnBase {
	some: true;
	value: T;
}

export type ShorthandSequenceReturn<T> = ShorthandSequenceEmptyReturn | ShorthandSequenceSomeReturn<T>;

export interface ShorthandSequenceArgument<T> {
	input: T;
	output(newValue: T): void;
}
