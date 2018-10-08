import { wait } from './wait';

export async function waitFor(
  predicate: () => (boolean | Promise<boolean>),
  message: string = '',
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
