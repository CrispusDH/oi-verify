import test from 'ava';
import { wait } from '../src/wait';

const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 500) {
    throw new Error('Elapsed time 0-500 ms');
  } else  if (elapsed < 1000) {
    throw new Error('Elapsed time 500-1000 ms');
  } else {
    return true;
  }
};

const boo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return true;
  }
};

test('error message should be the last one', async (t) => {
  const startTime = Date.now();
  const error = await t.throwsAsync(
    async () => await wait(
      () => foo(startTime),
      800
    )
  );
  t.truthy(error.message.includes('Error: Elapsed time 500-1000 ms'), `Actual message is: "${error.message}"`);
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await wait(
      () => boo(startTime),
      1100
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
