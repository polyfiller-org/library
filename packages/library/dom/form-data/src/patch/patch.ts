import {
	IS_FORM_DATA_PROTOTYPE_ENTRIES_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_FOR_EACH_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_GET_ALL_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_GET_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_HAS_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_KEYS_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_SYMBOL_ITERATOR_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_SYMBOL_TO_STRING_TAG_SUPPORTED,
	IS_FORM_DATA_PROTOTYPE_VALUES_SUPPORTED,
	IS_SYMBOL_ITERATOR_SUPPORTED,
	IS_SYMBOL_TO_STRING_TAG_SUPPORTED
} from "../support/index";
import {ORIGINAL_FORM_DATA, ORIGINAL_FORM_DATA_PROTOTYPE_APPEND, ORIGINAL_FORM_DATA_PROTOTYPE_DELETE, ORIGINAL_FORM_DATA_PROTOTYPE_SET} from "../constant";
import {constructDomException} from "../util/util";
import {FormDataEntries} from "../type/form-data-entries";

declare global {
	interface FormData {
		_entries: FormDataEntries;
	}
}

/**
 * Applies a polyfill for FormData. If 'replace' is true,
 * the browser-implementation will completely replaced
 */
export function patch(replace = false): void {
	// eslint-disable-next-line no-global-assign,@typescript-eslint/naming-convention
	FormData = function FormData(this: FormData, form?: HTMLFormElement) {
		const formData = replace || ORIGINAL_FORM_DATA == null ? this : new ORIGINAL_FORM_DATA(form);
		formData._entries = {};

		if (form != null) {
			for (let i = 0; i < form.elements.length; i++) {
				const element = form.elements[i];
				const name = (element as {name?: string}).name;
				const value = (element as {value?: string | File}).value;
				if (name == null || name.length < 1) continue;
				formData.append(name, value ?? "");
			}
		}

		// If the FormData implementation is to be replaced, manually
		// validate the arguments if given. If not, calling the original FormData constructor
		// will take care of throwing a DOMException if form is not a proper HTMLFormElement
		else if (replace && arguments.length > 0) {
			throw constructDomException("InvalidStateError");
		}
		return formData;
	} as unknown as new (form?: HTMLFormElement) => FormData;

	// Set the prototype so FormData looks correct when inspected
	if (ORIGINAL_FORM_DATA != null) {
		FormData.prototype = ORIGINAL_FORM_DATA?.prototype;
	}

	const formDataConstructor = replace || ORIGINAL_FORM_DATA == null ? FormData : ORIGINAL_FORM_DATA;

	if (replace || !IS_FORM_DATA_PROTOTYPE_HAS_SUPPORTED) {
		formDataConstructor.prototype.has = function has(name: string): boolean {
			return name in this._entries;
		};
	}

	if (replace || !IS_FORM_DATA_PROTOTYPE_GET_SUPPORTED) {
		formDataConstructor.prototype.get = function get(name: string): FormDataEntryValue | null {
			const values = this._entries[name];
			if (values == null) return null;
			if (values.length === 0) return null;
			return values[0];
		};
	}

	if (replace || !IS_FORM_DATA_PROTOTYPE_GET_ALL_SUPPORTED) {
		formDataConstructor.prototype.getAll = function (name: string): FormDataEntryValue[] {
			return this._entries[name] ?? [];
		};
	}

	formDataConstructor.prototype.delete = function get(name: string): void {
		if (!replace && ORIGINAL_FORM_DATA_PROTOTYPE_DELETE != null) {
			ORIGINAL_FORM_DATA_PROTOTYPE_DELETE.call(this, name);
		}
		delete this._entries[name];
	};

	formDataConstructor.prototype.append = function append(name: string, value: string | Blob, fileName?: string): void {
		if (!replace && ORIGINAL_FORM_DATA_PROTOTYPE_APPEND != null) {
			if (arguments.length === 3) {
				ORIGINAL_FORM_DATA_PROTOTYPE_APPEND.call(this, name, value, fileName);
			} else {
				ORIGINAL_FORM_DATA_PROTOTYPE_APPEND.call(this, name, value);
			}
		}

		let values = this._entries[name];
		if (values == null) {
			values = [];
			this._entries[name] = values;
		}
		values.push((value as FormDataEntryValue | File | undefined) ?? "");
	};

	formDataConstructor.prototype.set = function set(name: string, value: string | Blob, fileName?: string): void {
		if (!replace && ORIGINAL_FORM_DATA_PROTOTYPE_SET != null) {
			if (arguments.length === 3) {
				ORIGINAL_FORM_DATA_PROTOTYPE_SET.call(this, name, value, fileName);
			} else {
				ORIGINAL_FORM_DATA_PROTOTYPE_SET.call(this, name, value);
			}
		}

		this._entries[name] = [(value as FormDataEntryValue | File | undefined) ?? ""];
	};

	if (replace || !IS_FORM_DATA_PROTOTYPE_ENTRIES_SUPPORTED) {
		formDataConstructor.prototype.entries = function* entries(): IterableIterator<[string, FormDataEntryValue]> {
			for (const key in this._entries) {
				if (!Object.prototype.hasOwnProperty.call(this._entries, key)) continue;
				const values = this._entries[key];
				for (let i = 0; i < values.length; i++) {
					const value = values[i];
					yield [key, value];
				}
			}
		};
	}

	if (replace || !IS_FORM_DATA_PROTOTYPE_KEYS_SUPPORTED) {
		formDataConstructor.prototype.keys = function* keys(): IterableIterator<string> {
			for (const key in this._entries) {
				if (!Object.prototype.hasOwnProperty.call(this._entries, key)) continue;
				yield key;
			}
		};
	}

	if (replace || !IS_FORM_DATA_PROTOTYPE_VALUES_SUPPORTED) {
		formDataConstructor.prototype.values = function* values(): IterableIterator<FormDataEntryValue> {
			for (const key in this._entries) {
				if (!Object.prototype.hasOwnProperty.call(this._entries, key)) continue;
				const valuesForEntry = this._entries[key];
				for (let i = 0; i < valuesForEntry.length; i++) {
					const value = valuesForEntry[i];
					yield value;
				}
			}
		};
	}

	if (replace || !IS_FORM_DATA_PROTOTYPE_FOR_EACH_SUPPORTED) {
		formDataConstructor.prototype.forEach = function forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: unknown): void {
			for (const key in this._entries) {
				if (!Object.prototype.hasOwnProperty.call(this._entries, key)) continue;
				const values = this._entries[key];
				for (let i = 0; i < values.length; i++) {
					const value = values[i];
					if (thisArg != null) {
						callbackfn.call(thisArg, value, key, this);
					} else {
						callbackfn(value, key, this);
					}
				}
			}
		};
	}

	if (IS_SYMBOL_ITERATOR_SUPPORTED && (replace || !IS_FORM_DATA_PROTOTYPE_SYMBOL_ITERATOR_SUPPORTED)) {
		formDataConstructor.prototype[Symbol.iterator] = formDataConstructor.prototype.entries;
	}

	if (IS_SYMBOL_TO_STRING_TAG_SUPPORTED && (replace || !IS_FORM_DATA_PROTOTYPE_SYMBOL_TO_STRING_TAG_SUPPORTED)) {
		Object.defineProperty(formDataConstructor.prototype, Symbol.toStringTag, {
			get: {
				"[Symbol.toStringTag]"(): string {
					return "FormData";
				}
			}["[Symbol.toStringTag]"]
		});
	}
}
