/**
 * The Completion type is a Record used to explain the runtime propagation of values and control
 * flow such as the behaviour of statements (break, continue, return and throw) that perform nonlocal
 * transfers of control.
 */
export interface Completion<T = unknown> {
	"[[Type]]": "normal" | "break" | "continue" | "return" | "throw";
	"[[Value]]": T | undefined;
	"[[Target]]": string | undefined;
}

export interface CompletionAbrupt<T = unknown> extends Completion<T> {
	"[[Type]]": "break" | "continue" | "return" | "throw";
}

export interface CompletionThrow<T = unknown> extends Completion<T> {
	"[[Type]]": "throw";
}

export interface CompletionNormal<T = unknown> extends Completion<T> {
	"[[Type]]": "normal";
}
