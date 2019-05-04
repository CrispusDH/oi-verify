import test from 'ava';
import { Verify } from '../../src/verify';

const array = [
  'abc', 5, 6, 'xyz'
];
const sub = [
  6, 'xyz'
];
const different = [
  'yo', 5
];
const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return different;
  }
};

test('error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.arrayDoesNotIncludeSubArray(
        array,
        sub,
        600
      );
    }
  );
  t.truthy(error.message.includes(`${JSON.stringify(array)}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes(`${JSON.stringify(sub)}`), `Actual error message is:\n"${error.message}"`);
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.arrayDoesNotIncludeSubArray(
      array,
      () => foo(startTime)
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
