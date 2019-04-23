## Verify library for UI WEB based projects

### waitFor()

`waitFor()` method using for pooling some condition (function that return `boolean` or `Promise<boolean>`) to became `true` during some time.

```js
export async function waitFor(
  predicate: () => (boolean | Promise<boolean>),
  message: string = '',
  timeout: number = 10 * 1000,
  pollTimeout: number = 200
): Promise<void>
```

#### example

predicate function `function isVisible(element): Promise<void>`

how to use it with `waitFor()`

`await waitFor(() => isVisible(element)`

### Verify

It is a class that has helpful assertion. What is a trick? If you want to re-fetch your element each time you have to use arrow functions.

#### Example with Verify:

Let's imagine that we need to check that after login user name will be changed from 'Guest' to 'Oleksii'. We will use `.stringsAreEqual()`, something like this:
```js
    await Verify.stringsAreEqual(
      () => header.getUserName(),
      'Oleksii'
    );
```
**Take your attention** that because of specific `this` binding in `js` you should put a function that retruns `Promise<>` in such way: 
```
() => function()
```
instead of `await function()` or `() => await function()`.

**Take your attention** that `Verify.someMethod()` returns `Promise`. I use `async ... await`. So, just write `await Verify.someMethod()`

#### Using Protractor expected conditions:
Different is that you don't need to write Predicates, it has been written for you :)
So, our `WaitConditions` class will look as
```js
import { ElementFinder, ExpectedConditions as EC } from 'protractor';
import { waitFor } from 'oi-verify';

export class WaitConditions {
  public static async clickable(element: ElementFinder): Promise<void> {
    await waitFor(
      EC.elementToBeClickable(element) as () => Promise<boolean>,
      `${element.locator()} was expected to be clickable`
    );
  }

  public static async visible(element: ElementFinder): Promise<void> {
    await waitFor(
      EC.visibilityOf(element) as () => Promise<boolean>,
      `${element.locator()} was expected to be visible`
    );
  }
```

### Questions
Questions are welcome.

### List of `Verify` methods:
- `toBeTruthy(getBoolean: BooleanSupplier): Promise<void>`
- `textContains(getText: StringSupplier, getSubString: StringSupplier): Promise<void>`
- `numbersAreEqual(getFirst: NumberSupplier, getSecond: NumberSupplier): Promise<void>`
- `stringsAreEqual(getFirst: StringSupplier, getSecond: StringSupplier): Promise<void>`
- `stringsAreNotEqual(getFirst: StringSupplier, getSecond: StringSupplier): Promise<void>`
- `textNotContains(getText: Supplier<string>, substring: string): Promise<void>`
- `objectsAreEqual(getObject: Supplier<object>, object: object): Promise<void>`
- `greaterThan(getNumber: Supplier<number>, secondNumber: number): Promise<void>`
- `lessThan(getNumber: Supplier<number>, secondNumber: number): Promise<void>`
- `valueIsNotDefined<T>(getValue: Supplier<T>): Promise<void>`
- `arrayIncludesSubArray(getSourceArray: Supplier<Array<string>>, subArray: Array<string>): Promise<void>`
- `arrayDoesNotIncludeSubArray(getSourceArray: Supplier<Array<string>>, subArray: Array<string>): Promise<void>`

### TBD
Improve error messages
