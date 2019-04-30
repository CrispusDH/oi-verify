import test from 'ava';
import { Verify } from '../../src/verify';

const value = 47;
const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return value;
  }
};

test('error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.numbersAreEqual(
        value,
        4,
        600
      );
    }
  );
  t.truthy(error.message.includes(`${value}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes('4'), `Actual error message is:\n"${error.message}"`);
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.numbersAreEqual(
      () => foo(startTime),
      value
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
