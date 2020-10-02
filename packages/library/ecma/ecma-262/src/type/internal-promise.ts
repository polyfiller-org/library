import {PromiseReaction} from "./promise-reaction";

export interface InternalPromiseBase<T> extends Promise<T> {
	"[[PromiseState]]": "pending" | "fulfilled" | "rejected";
	"[[PromiseFulfillReactions]]": PromiseReaction<T>[];
	"[[PromiseRejectReactions]]": PromiseReaction<T>[];
	"[[PromiseIsHandled]]": boolean;
}

export interface PendingInternalPromise<T> extends InternalPromiseBase<T> {
	"[[PromiseState]]": "pending";
}

export interface FulfilledInternalPromise<T> extends InternalPromiseBase<T> {
	"[[PromiseState]]": "fulfilled";
	"[[PromiseResult]]": T;
}

export interface RejectedInternalPromise<T> extends InternalPromiseBase<T> {
	"[[PromiseState]]": "rejected";
	"[[PromiseResult]]": Error;
}

export type InternalPromise<T> = PendingInternalPromise<T> | FulfilledInternalPromise<T> | RejectedInternalPromise<T>;
