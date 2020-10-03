import {InternalSlotMap} from "./internal-slot-map";

/**
 * Constructs a new InternalSlotMap
 * @template Type, InternalSlots
 * @type {InternalSlotMap<Type, InternalSlots>}
 */
export function constructInternalSlotMap<Type extends object, InternalSlots>(): InternalSlotMap<Type, InternalSlots> {
	const map = new WeakMap<Type, InternalSlots>();

	return {
		/**
		 * Sets the value for a property in an internal slot for an instance
		 */
		setInternalSlot<Key extends keyof InternalSlots>(instance: Type, property: Key, value: InternalSlots[Key]): void {
			let record = map.get(instance);
			if (record == null) {
				record = Object.create(null) as InternalSlots;
				map.set(instance, record);
			}

			// Update the property with the given value
			record[property] = value;
		},

		/**
		 * Gets the value associated with the given property on the internal slots of the given instance
		 */
		getInternalSlot<Key extends keyof InternalSlots>(instance: Type, property: Key): InternalSlots[Key] {
			const record = map.get(instance);
			if (record == null) {
				throw new ReferenceError(`No internal slots has been allocated for the given instance`);
			}

			return record[property];
		},

		/**
		 * Returns true if the given property on the internal slots of the given instance exists
		 */
		hasInternalSlot<Key extends keyof InternalSlots>(instance: Type, property: Key): boolean {
			const record = map.get(instance);
			return record != null && property in record;
		}
	};
}
