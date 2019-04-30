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
  await t.throwsAsync(
    async () => {
      await Verify.toBeTruthy(false, 500);
    }
  );
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.toBeTruthy(
      () => foo(startTime),
      1100
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
