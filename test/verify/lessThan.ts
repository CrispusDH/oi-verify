import test from 'ava';
import { Verify } from '../../src/verify';

const bigger = 10;
const smaller = 5;
const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return smaller;
  }
};

test('error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.lessThan(
        smaller,
        3,
        600
      );
    },
  );
  t.truthy(error.message.includes(`${smaller}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes('3'), `Actual error message is:\n"${error.message}"`);
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.lessThan(
      () => foo(startTime),
      bigger
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
