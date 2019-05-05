## Verify library for UI WEB based projects

### Verify

It is a class that has helpful assertion. How it works:
```js
    await Verify.stringsAreEqual(
      () => header.getUserName(),
      'Oleksii'
    );
```
1. All assertion methods have 3-4 arguments:
    - two or one argument(s) that will be compared
    - `timeout` - optional, during what time assertion will be wait until predicate return true (default 10 sec)
    - `pollTimeout` - optional, interval between pooling predicate (default 200 ms)
2. If assert will fail it will try again after some `interval` during `timeout` time
3. All assertion methods work with such compared arguments:
    - simple types such as `string`, `boolean` etc.
    - arrow function with function such as `() => page.getUrl()`. For what we HAVE TO use such construction:
        - it will bind `this` each time when method will be try to compare arguments
        - if you will try to use just `await page.getUrl()` it will take value just once and when will use obsolete value again and again without re-fetching
4. Working with resolving promise:
    - any assertion method return `Promise<void>`, so you should resolve it (e.g. `await Verify.numbersAreEqual(...)`)
    - inside arrow function you don't need resolve Promise, so fi you have function that return Promise, for example `await page.getUrl()`, you need to use it like `() => page.getUrl()`
5. Compared arguments can be both like as arrow function 


#### Error handling
In version 2 was added smart error handling and tests for all assertion methods.
How work error handling? Let's assume that you compare one function that return number with expected number 5.
- first tick function got webdriver error `another Element will recieve this command`, for example some animation still active;
- second tick function returns 4 and timeout time is reached
In that case you will get error message that two numbers are not equal, expected number, and actual result (or error) from last tick

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
Make default constants (`timeout`, `pollTimeout`) configurable. 
