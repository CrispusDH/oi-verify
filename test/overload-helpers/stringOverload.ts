import test from 'ava';
import { stringOverload } from '../../src/overload-helpers';

const text = 'It’s time to fly';
const foo = async () => Promise.resolve(text);

test('return string if argument is string', async (t) => {
  t.is(
    await stringOverload(text),
    text
  );
});

test('return string if argument is () => Promise<string>', async (t) => {
  t.is(
    await stringOverload(() => foo()),
    text
  );
});
