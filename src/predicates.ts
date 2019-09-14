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
    getSubString: StringSupplier,
    error: string = ''
  ): Supplier<boolean> {
    return async () => {
      const text = await stringOverload(getText);
      const substring = await stringOverload(getSubString);
      if (text.includes(substring)) {
        return true;
      }
      throw new Error(`${error}\nText does not contain substring.\nText:      "${text}"\nSubstring: "${substring}"`);
    };
  }

  public static isTextNotContain(
    getText: StringSupplier,
    getSubstring: StringSupplier,
    error: string = ''
  ): Supplier<boolean> {
    return async () => {
      const text = await stringOverload(getText);
      const substring = await stringOverload(getSubstring);
      if (!text.includes(substring)) {
        return true;
      }
      throw new Error(`${error}\nText contains substring.\nText:      "${text}"\nSubstring: "${substring}"`);
    };
  }

  public static areEqualNumbers(
    getExpected: NumberSupplier,
    getActual: NumberSupplier,
    error: string = ''
  ): Supplier<boolean> {
    return async () => {
      const expected = await numberOverload(getExpected);
      const actual = await numberOverload(getActual);
      if (expected === actual) {
        return true;
      }
      throw new Error(`${error}\nNumbers are not equal.\nExpected: ${expected}\nActual:   ${actual}`);
    };
  }

  public static areEqualStrings(
    getExpected: StringSupplier,
    getActual: StringSupplier,
    error: string = ''
  ): Supplier<boolean> {
    return async () => {
      const expected = await stringOverload(getExpected);
      const actual = await stringOverload(getActual);
      if (expected === actual) {
        return true;
      }
      throw new Error(`${error}\nStrings are not equal.\nExpected: "${expected}"\nActual:   "${actual}"`);
    };
  }

  public static areNotEqualStrings(
    getExpected: StringSupplier,
    getActual: StringSupplier,
    error: string = ''
  ): Supplier<boolean> {
    return async () => {
      const expected = await stringOverload(getExpected);
      const actual = await stringOverload(getActual);
      if (expected !== actual) {
        return true;
      }
      throw new Error(`${error}\nStrings are equal.\nExpected: "${expected}"\nActual:   "${actual}"`);
    };
  }

  public static areEqualObjects(
    getExpected: ObjectSupplier,
    getActual: ObjectSupplier,
    error: string = ''
  ): Supplier<boolean> {
    return async () => {
      const expected = await objectOverload(getExpected);
      const actual = await objectOverload(getActual);
      const expectedProps = Object.getOwnPropertyNames(expected);
      const actualProps = Object.getOwnPropertyNames(actual);

      if (expectedProps.length !== actualProps.length) {
        throw new Error(
          `${error}\nObjects are not equal.\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
        );
      }

      for (const i of expectedProps) {
        const propName = expectedProps[i];

        if (expected[propName] !== actual[propName]) {
          throw new Error(
            `${error}\nObjects are not equal.\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
          );
        }
      }

      return true;
    };
  }

  public static isGreaterThan(
    getBigger: NumberSupplier,
    getSmaller: NumberSupplier,
    error: string = ''
  ): Supplier<boolean> {
    return async () => {
      const bigger = await numberOverload(getBigger);
      const smaller = await numberOverload(getSmaller);
      if (bigger > smaller) {
        return true;
      }
      throw new Error(`${error}\nBigger number is less than smaller.\nBigger:  ${bigger}\nSmaller: ${smaller}`);
    };
  }

  public static isLessThan(
    getSmaller: NumberSupplier,
    getBigger: NumberSupplier,
    error: string = ''
): Supplier<boolean> {
    return async () => {
      const smaller = await numberOverload(getSmaller);
      const bigger = await numberOverload(getBigger);
      if (smaller < bigger) {
        return true;
      }
      throw new Error(`${error}\nSmaller number is bigger than bigger.\nSmaller:  ${smaller}\nBigger: ${bigger}`);
    };
  }

  public static isValueNotDefined<T>(getValue: Supplier<T>, error: string = ''): Supplier<boolean> {
    return async () => {
      const value = await getValue();
      if (!value) {
        return true;
      }
      throw new Error(`${error}\nValue "${value}" expected to be not defined`);
    };
  }

  public static isTruthy(expression: BooleanSupplier, error: string = ''): Supplier<boolean> {
    return async () => {
      if (await booleanOverload(expression)) {
        return true;
      }
      throw new Error(`${error}\nGiven condition produced negative result`);
    };
  }

  public static isArrayIncludesSubArray<T>(
    getSourceArray: ArraySupplier<T>,
    subArray: ArraySupplier<T>,
    error: string = ''
  ): Supplier<boolean> {
    return async (): Promise<boolean> => {
      const source = await arrayOverload(getSourceArray);
      const sub = await arrayOverload(subArray);
      if (sub.every((item) => source.indexOf(item) !== -1)) {
        return true;
      }
      // tslint:disable max-line-length
      throw new Error(`${error}\nArray does not include sub array.\nArray:    ${JSON.stringify(source)}\nSubArray: ${JSON.stringify(sub)}`);
    };
  }

  public static isArrayNotIncludesSubArray<T>(
    getSourceArray: ArraySupplier<T>,
    subArray: ArraySupplier<T>,
    error: string = ''
  ): Supplier<boolean> {
    return async (): Promise<boolean> => {
      const source = await arrayOverload(getSourceArray);
      const sub = await arrayOverload(subArray);
      if (sub.some((item) => source.indexOf(item) === -1)) {
        return true;
      }
      // tslint:disable max-line-length
      throw new Error(`${error}\nArray includes sub array.\nArray:    ${JSON.stringify(source)}\nSubArray: ${JSON.stringify(sub)}`);
    };
  }
}
