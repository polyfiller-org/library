export interface InternalSlotMap<Type extends object, InternalSlots> {
	setInternalSlot<Key extends keyof InternalSlots>(instance: Type, property: Key, value: InternalSlots[Key]): void;
	getInternalSlot<Key extends keyof InternalSlots>(instance: Type, property: Key): InternalSlots[Key];
	hasInternalSlot<Key extends keyof InternalSlots>(instance: Type, property: Key): boolean;
}
