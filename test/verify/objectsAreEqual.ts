import test from 'ava';
import { Verify } from '../../src/verify';

const object = {
  a: 10,
  b: 'hello',
  c: true
};
const different = {
  a: 10,
  b: 'hello',
  c: true,
  e: 56
};
const foo = async (startTime) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < 800) {
    throw new Error('Elapsed time 0-800 ms');
  } else {
    return object;
  }
};

test('error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.objectsAreEqual(
        object,
        different,
        undefined,
        600
      );
    }
  );
  t.truthy(error.message.includes(`${JSON.stringify(object)}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes(`${JSON.stringify(different)}`), `Actual error message is:\n"${error.message}"`);
});

test('cusrom error message', async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await Verify.objectsAreEqual(
        object,
        different,
        'Custom error message',
        600
      );
    }
  );
  t.truthy(error.message.includes(`${JSON.stringify(object)}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes(`${JSON.stringify(different)}`), `Actual error message is:\n"${error.message}"`);
  t.truthy(error.message.includes('Custom error message'), `Actual error message is:\n"${error.message}"`);
});

test('should pass after 800 ms', async (t) => {
  const startTime = Date.now();
  await t.notThrowsAsync(
    async () => await Verify.objectsAreEqual(
      () => foo(startTime),
      object
    )
  );
  const elapsed = Date.now() - startTime;
  t.truthy(elapsed > 700);
});
