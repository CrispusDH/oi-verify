import test from 'ava';
import { Verify } from '../../src/verify';

const bigger = 10;
const smaller = 5;
const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return bigger;
  }
};

test('error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.greaterThan(
        bigger,
        15,
        600
      );
    }
  );
  t.truthy(error.message.includes(`${bigger}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes('15'), `Actual error message is:\n"${error.message}"`);
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.greaterThan(
      () => foo(startTime),
      smaller
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
