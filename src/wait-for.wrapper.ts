import { wait } from './wait';
import { Supplier } from './overload-helpers';

export async function waitFor(
  predicate: () => boolean | Supplier<boolean>,
  message: string,
  timeout: number = 10 * 1000,
  pollTimeout: number = 200
): Promise<void> {
  await wait(
    predicate,
    timeout,
    message,
    pollTimeout
  );
}
