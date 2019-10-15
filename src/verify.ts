import {
  ArraySupplier,
  BooleanSupplier,
  NumberSupplier,
  ObjectSupplier,
  StringSupplier,
  Supplier
} from './overload-helpers';
import { Predicates } from './predicates';
import { waitFor } from './wait-for.wrapper';
import { sanitizeErrorMessage } from './utils';

export class Verify {
  public static async toBeTruthy(
    expression: BooleanSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTruthy(expression, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async textContains(
    text: StringSupplier,
    substring: StringSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTextContain(text, substring, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async numbersAreEqual(
    expected: NumberSupplier,
    actual: NumberSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    try {
      await waitFor(
        Predicates.areEqualNumbers(expected, actual, errorMessage),
        undefined,
        timeout,
        pollTimeout
      );
    } catch (error) {
      const stackError = new Error();
      throw sanitizeErrorMessage(error, stackError);
    }
  }

  public static async stringsAreEqual(
    expected: StringSupplier,
    actual: StringSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualStrings(expected, actual, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async stringsAreNotEqual(
    expected: StringSupplier,
    actual: StringSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areNotEqualStrings(expected, actual, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async textNotContains(
    text: StringSupplier,
    substring: StringSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTextNotContain(text, substring, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async objectsAreEqual(
    expected: ObjectSupplier,
    actual: ObjectSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualObjects(expected, actual, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async greaterThan(
    bigger: NumberSupplier,
    smaller: NumberSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isGreaterThan(bigger, smaller, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async lessThan(
    smaller: NumberSupplier,
    bigger: NumberSupplier,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isLessThan(smaller, bigger, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async valueIsNotDefined<T>(
    value: Supplier<T>,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isValueNotDefined(value, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async arrayIncludesSubArray<T>(
    array: ArraySupplier<T>,
    subArray: ArraySupplier<T>,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayIncludesSubArray(array, subArray, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async arrayDoesNotIncludeSubArray<T>(
    array: ArraySupplier<T>,
    subArray: ArraySupplier<T>,
    errorMessage?: string,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayNotIncludesSubArray(array, subArray, errorMessage),
      undefined,
      timeout,
      pollTimeout
    );
  }
}
