## Verify library for UI WEB based projects
### The purpose
Ability to check some predicates in case when changes take place with Element(s) that has been already on page and changes depends on some time cost-based oparation (e.g. API call).
#### Example:
Let's imagine that we have page with element that contains some User Name. After some changes this text will change, but the element (DOM will be the same) will be the same. So, if we will check immideatly the name the Protractor could return old one. Even after one second it could be still old name. The problem that element has been already on a page.
### What we need:
If we will find Element and then will ping e.g. text of it, so in this case we will always get old name and then we will catch Stateless element exception (that such element is not in the DOM).
So, we need that each time when we will ping predicate it will find again the Element and will not use cached one.
#### Example:
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
