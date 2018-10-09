## Verify library for UI WEB based projects
### The purpose
Ability to check some predicates in case when changes take place with Element(s) that has been already on page and changes depends on some time cost-based oparation (e.g. API call).
#### Example:
Let's imagine that we have page with element that contains some User Name. After some changes this text will change, but the element (DOM will be the same) will be the same. So, if we will check immideatly the name the Protractor could return old one. Even after one second it could be still old name. The problem that element has been already on a page.
### What we need:
If we will find Element and then will ping e.g. text of it, so in this case we will always get old name and then we will catch Stateless element exception (that such element is not in the DOM).
So, we need that each time when we will ping predicate it will find again the Element and will not use cached one.
### Example with Verify:
Let's imagine that we need to check that after login user name will be changed from 'Guest' to 'Oleksii'. We will use `.stringsAreEqual()`, something like this:
```js
    await Verify.stringsAreEqual(
      () => header.getUserName(),
      'Oleksii'
    );
```
What arguments take this method? Two arguments with type `StringSupplier`. Go a little bit deeper and take a look at Supplier types in this library:
```js
type Supplier<T> = () => Promise<T>;
type StringSupplier = string | Supplier<string>;
type NumberSupplier = number | Supplier<number>;
type BooleanSupplier = boolean | Supplier<boolean>;
```
So, `StringSupplier` argument should be either `string` or function that returns `string` inside `Promise` - `() => Promise<string>`. 
**Take your attention** that because of specific `this` binding in `js` you should put a function that retruns `Promise<>` in such way: 
```
() => function()
```
instead of `await function()` or `() => await function()`.

**Take your attention** that `Verify.someMethod()` returns `Promise`. I use `async ... await`. So, just write `await Verify.someMethod()`

### Example with custom Predicate:
You can create your own `SomeClass` or `function` that will use your own Predicates or Protractor Expected Conditions.
For this purpose you have to use `waitFor()` from this library.
This function has four arguments:
- `predicate`, this should be a function that returns `boolean` or `Promise<boolean>`. This is our Predicate/Condition that we want to verify/check;
- `message` (Optional), it is a text that returns when `timeout` time ends. It would be very helpful too see some friendly message what you verify;
- `timeout` (Optional, by default 10 sec), time while `waitFor()` will wait that `predicate` becomes `true`;
- `pollTimeout` (Optional, by default 200 ms), waiting time between polling. It is very useful parameter, very strange that in `webdriver js` this is a constant 0.

#### Custom predicate:
Create custom predicate, this will check that our `Array` is not empty
```js
import { ArrayFragment } from '@src/utils/fragment/array-fragment.wrapper';
import { Fragment } from '@src/utils/fragment/fragment.wrapper';

export class Predicates {
  public static isArrayNotEmpty(array: ArrayFragment<Fragment>): () => Promise<boolean> {
    return async () => {
      return await array.count() > 0;
    };
  }
}
```
Then you need wrap Predicate using `waitFor()`
```js
import { Predicates } from '@src/utils/waiters/predicates';
import { waitFor } from 'oi-verify';

export class WaitConditions {
  public static async arrayIsNotEmpty(array: ArrayFragment<Fragment>): Promise<void> {
    await waitFor(
      Predicates.isArrayNotEmpty(array),
      'Array of fragments expected to be not empty'
    );
  }
}
```
And usage will be quite simple: `await WaitConditions.arrayIsNotEmpty(someArrayElements)`

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
We need just on trick. Protractor conditions has `Function` type, that is the same to `() => Promise<any>`. But we know that conditions return `boolean`. So, we need just cast type to `as () => Promise<boolean>`.
It works ;)
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
