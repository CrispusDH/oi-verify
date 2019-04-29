import { BooleanSupplier, NumberSupplier, StringSupplier, Supplier } from './overload-helpers';
import { Predicates } from './predicates';
import { waitFor } from './wait-for.wrapper';

export class Verify {
  public static async toBeTruthy(
    getBoolean: BooleanSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTruthy(getBoolean),
      'Given condition produced negative result',
      timeout,
      pollTimeout
    );
  }

  public static async textContains(
    getText: StringSupplier,
    getSubString: StringSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTextContain(getText, getSubString),
      'Given text does not contain substring',
      timeout,
      pollTimeout
    );
  }

  public static async numbersAreEqual(
    getFirst: NumberSupplier,
    getSecond: NumberSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualNumbers(getFirst, getSecond),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async stringsAreEqual(
    getFirst: StringSupplier,
    getSecond: StringSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualStrings(getFirst, getSecond),
      'Given strings are not equal',
      timeout,
      pollTimeout
    );
  }

  public static async stringsAreNotEqual(
    getFirst: StringSupplier,
    getSecond: StringSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areNotEqualStrings(getFirst, getSecond),
      'Given strings are equal',
      timeout,
      pollTimeout
    );
  }

  public static async textNotContains(
    getText: Supplier<string>,
    substring: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTextNotContain(getText, substring),
      `Given text does not contain "${substring}"`,
      timeout,
      pollTimeout
    );
  }

  public static async objectsAreEqual(
    getObject: Supplier<object>,
    object: object,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualObjects(getObject, object),
      'Objects are not equal',
      timeout,
      pollTimeout
    );
  }

  public static async greaterThan(
    getNumber: Supplier<number>,
    secondNumber: number,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isGreaterThan(getNumber, secondNumber),
      `${await getNumber()} is not greater than ${secondNumber}`,
      timeout,
      pollTimeout
    );
  }

  public static async lessThan(
    getNumber: Supplier<number>,
    secondNumber: number,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isLessThan(getNumber, secondNumber),
      `${await getNumber()} is not greater than ${secondNumber}`,
      timeout,
      pollTimeout
    );
  }

  public static async valueIsNotDefined<T>(
    getValue: Supplier<T>,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isValueNotDefined(getValue),
      `Verify.valueIsNotDefined: ${await getValue()} is defined`,
      timeout,
      pollTimeout
    );
  }

  public static async arrayIncludesSubArray(
    getSourceArray: Supplier<Array<string>>,
    subArray: Array<string>,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayIncludesSubArray(getSourceArray, subArray),
      'Source array does not include sub array',
      timeout,
      pollTimeout
    );
  }

  public static async arrayDoesNotIncludeSubArray(
    getSourceArray: Supplier<Array<string>>,
    subArray: Array<string>,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayNotIncludesSubArray(getSourceArray, subArray),
      'Source array includes sub array. But should not!',
      timeout,
      pollTimeout
    );
  }
}
