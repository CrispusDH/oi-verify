import test from 'ava';
import { Verify } from '../../src/verify';

const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return true;
  }
};

test('error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.toBeTruthy(false, undefined, 500);
    }
  );
  t.truthy(
    error.message.includes('Given condition produced negative result'),
    `Actual error message is:\n"${error.message}"`
  );
});

test('custom error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.toBeTruthy(false, 'Custom error message', 500);
    }
  );
  t.truthy(
    error.message.includes('Given condition produced negative result'),
    `Actual error message is:\n"${error.message}"`
  );
  t.truthy(
    error.message.includes('Custom error message'),
    `Actual error message is:\n"${error.message}"`
  );
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.toBeTruthy(
      () => foo(startTime),
      undefined,
      1100
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
