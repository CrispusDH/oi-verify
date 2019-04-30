import test from 'ava';
import { Verify } from '../../src/verify';

const text = 'Wow, I see you.';
const substring = ', I see';
const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return text;
  }
};

test('error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.textContains(
        text,
        'I do not see you',
        600
      );
    }
  );
  t.truthy(error.message.includes(`${text}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes('I do not see you'), `Actual error message is:\n"${error.message}"`);
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.textContains(
      () => foo(startTime),
      substring
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
