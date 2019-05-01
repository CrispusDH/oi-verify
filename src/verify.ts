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

export class Verify {
  public static async toBeTruthy(
    expression: BooleanSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTruthy(expression),
      'Given condition produced negative result',
      timeout,
      pollTimeout
    );
  }

  public static async textContains(
    text: StringSupplier,
    substring: StringSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTextContain(text, substring),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async numbersAreEqual(
    first: NumberSupplier,
    second: NumberSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualNumbers(first, second),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async stringsAreEqual(
    first: StringSupplier,
    second: StringSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualStrings(first, second),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async stringsAreNotEqual(
    first: StringSupplier,
    second: StringSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areNotEqualStrings(first, second),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async textNotContains(
    text: StringSupplier,
    substring: StringSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isTextNotContain(text, substring),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async objectsAreEqual(
    first: ObjectSupplier,
    second: ObjectSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualObjects(first, second),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async greaterThan(
    bigger: NumberSupplier,
    smaller: NumberSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isGreaterThan(bigger, smaller),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async lessThan(
    smaller: NumberSupplier,
    bigger: NumberSupplier,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isLessThan(smaller, bigger),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async valueIsNotDefined<T>(
    value: Supplier<T>,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isValueNotDefined(value),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async arrayIncludesSubArray<T>(
    array: ArraySupplier<T>,
    subArray: ArraySupplier<T>,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayIncludesSubArray(array, subArray),
      undefined,
      timeout,
      pollTimeout
    );
  }

  public static async arrayDoesNotIncludeSubArray<T>(
    array: ArraySupplier<T>,
    subArray: ArraySupplier<T>,
    timeout?: number,
    pollTimeout?: number
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayNotIncludesSubArray(array, subArray),
      undefined,
      timeout,
      pollTimeout
    );
  }
}
