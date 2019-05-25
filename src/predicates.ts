import {
  arrayOverload,
  ArraySupplier,
  booleanOverload,
  BooleanSupplier,
  numberOverload,
  NumberSupplier, objectOverload, ObjectSupplier,
  stringOverload,
  StringSupplier,
  Supplier
} from './overload-helpers';

export class Predicates {
  public static isTextContain(
    getText: StringSupplier,
    getSubString: StringSupplier
  ): Supplier<boolean> {
    return async () => {
      const text = await stringOverload(getText);
      const substring = await stringOverload(getSubString);
      if (text.includes(substring)) {
        return true;
      }
      throw new Error(`Text does not contain substring.\nText:      "${text}"\nSubstring: "${substring}"`);
    };
  }

  public static isTextNotContain(
    getText: StringSupplier,
    getSubstring: StringSupplier
  ): Supplier<boolean> {
    return async () => {
      const text = await stringOverload(getText);
      const substring = await stringOverload(getSubstring);
      if (!text.includes(substring)) {
        return true;
      }
      throw new Error(`Text contains substring.\nText:      "${text}"\nSubstring: "${substring}"`);
    };
  }

  public static areEqualNumbers(
    getExpected: NumberSupplier,
    getActual: NumberSupplier
  ): Supplier<boolean> {
    return async () => {
      const expected = await numberOverload(getExpected);
      const actual = await numberOverload(getActual);
      if (expected === actual) {
        return true;
      }
      throw new Error(`Numbers are not equal.\nExpected: ${expected}\nActual:   ${actual}`);
    };
  }

  public static areEqualStrings(
    getExpected: StringSupplier,
    getActual: StringSupplier
  ): Supplier<boolean> {
    return async () => {
      const expected = await stringOverload(getExpected);
      const actual = await stringOverload(getActual);
      if (expected === actual) {
        return true;
      }
      throw new Error(`Strings are not equal.\nExpected: "${expected}"\nActual:   "${actual}"`);
    };
  }

  public static areNotEqualStrings(
    getExpected: StringSupplier,
    getActual: StringSupplier
  ): Supplier<boolean> {
    return async () => {
      const expected = await stringOverload(getExpected);
      const actual = await stringOverload(getActual);
      if (expected !== actual) {
        return true;
      }
      throw new Error(`Strings are equal.\nExpected: "${expected}"\nActual:   "${actual}"`);
    };
  }

  public static areEqualObjects(
    getExpected: ObjectSupplier,
    getActual: ObjectSupplier
  ): Supplier<boolean> {
    return async () => {
      const expected = await objectOverload(getExpected);
      const actual = await objectOverload(getActual);
      const expectedProps = Object.getOwnPropertyNames(expected);
      const actualProps = Object.getOwnPropertyNames(actual);

      if (expectedProps.length !== actualProps.length) {
        throw new Error(
          `Objects are not equal.\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
        );
      }

      for (const i of expectedProps) {
        const propName = expectedProps[i];

        if (expected[propName] !== actual[propName]) {
          throw new Error(
            `Objects are not equal.\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
          );
        }
      }

      return true;
    };
  }

  public static isGreaterThan(
    getBigger: NumberSupplier,
    getSmaller: NumberSupplier
  ): Supplier<boolean> {
    return async () => {
      const bigger = await numberOverload(getBigger);
      const smaller = await numberOverload(getSmaller);
      if (bigger > smaller) {
        return true;
      }
      throw new Error(`Bigger number is less than smaller.\nBigger:  ${bigger}\nSmaller: ${smaller}`);
    };
  }

  public static isLessThan(
    getSmaller: NumberSupplier,
    getBigger: NumberSupplier
): Supplier<boolean> {
    return async () => {
      const smaller = await numberOverload(getSmaller);
      const bigger = await numberOverload(getBigger);
      if (smaller < bigger) {
        return true;
      }
      throw new Error(`Smaller number is bigger than bigger.\nSmaller:  ${smaller}\nBigger: ${bigger}`);
    };
  }

  public static isValueNotDefined<T>(getValue: Supplier<T>): Supplier<boolean> {
    return async () => {
      const value = await getValue();
      if (!value) {
        return true;
      }
      throw new Error(`Value "${value}" expected to be not defined`);
    };
  }

  public static isTruthy(expression: BooleanSupplier): Supplier<boolean> {
    return async () => {
      return booleanOverload(expression);
    };
  }

  public static isArrayIncludesSubArray<T>(
    getSourceArray: ArraySupplier<T>,
    subArray: ArraySupplier<T>
  ): Supplier<boolean> {
    return async (): Promise<boolean> => {
      const source = await arrayOverload(getSourceArray);
      const sub = await arrayOverload(subArray);
      if (sub.every((item) => source.indexOf(item) !== -1)) {
        return true;
      }
      // tslint:disable max-line-length
      throw new Error(`Array does not include sub array.\nArray:    ${JSON.stringify(source)}\nSubArray: ${JSON.stringify(sub)}`);
    };
  }

  public static isArrayNotIncludesSubArray<T>(
    getSourceArray: ArraySupplier<T>,
    subArray: ArraySupplier<T>
  ): Supplier<boolean> {
    return async (): Promise<boolean> => {
      const source = await arrayOverload(getSourceArray);
      const sub = await arrayOverload(subArray);
      if (sub.some((item) => source.indexOf(item) === -1)) {
        return true;
      }
      // tslint:disable max-line-length
      throw new Error(`Array includes sub array.\nArray:    ${JSON.stringify(source)}\nSubArray: ${JSON.stringify(sub)}`);
    };
  }
}
