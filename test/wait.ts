import test from 'ava';
import { wait } from '../src/wait';

const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 1000) {
    throw new Error('Elapsed time 0-1 sec');
  } else  if (elapsed < 3000) {
    throw new Error('Elapsed time 1-3 sec');
  } else {
    return true;
  }
};

const boo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 1900) {
    throw new Error('Elapsed time 0-1 sec');
  } else {
    return true;
  }
};

test('error message should be the last one', async (t) => {
  const startTime = Date.now();
  const error = await t.throwsAsync(
    async () => await wait(
      () => foo(startTime),
      2000
    )
  );
  t.truthy(error.message.includes('Error: Elapsed time 1-3 sec'), `Actual message is: "${error.message}"`);
});

test('should pass after 1.9 sec', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await wait(
      () => boo(startTime),
      3000
    )
  );
});
