export type Supplier<T> = () => Promise<T>;
export type StringSupplier = string | Supplier<string>;
export type NumberSupplier = number | Supplier<number>;
export type BooleanSupplier = boolean | Supplier<boolean>;
export type ObjectSupplier = object | Supplier<object>;
export type ArraySupplier<T> = Array<T> | Supplier<Array<T>>;

export async function stringOverload(getText: StringSupplier): Promise<string> {
  return typeof getText === 'function' ? await getText() : getText;
}

export async function numberOverload(getNumber: NumberSupplier): Promise<number> {
  return typeof getNumber === 'function' ? await getNumber() : getNumber;
}

export async function booleanOverload(getBoolean: BooleanSupplier): Promise<boolean> {
  return typeof getBoolean === 'function' ? await getBoolean() : getBoolean;
}

export async function objectOverload(getObject: ObjectSupplier): Promise<object> {
  return typeof getObject === 'function' ? await getObject() : getObject;
}

export async function arrayOverload<T>(getArray: ArraySupplier<T>): Promise<Array<T>> {
  return typeof getArray === 'function' ? await getArray() : getArray;
}
