import { Supplier } from './overload-helpers';

export function wait(
  predicate: () => boolean | Supplier<boolean>,
  timeout: number = 0,
  message: string = '',
  pollTimeout: number = 0): Promise<any> {
  if (timeout < 0) {
    throw new Error(`timeout must be a number >= 0: ${timeout}`);
  }
  if (pollTimeout < 0) {
    throw new Error(`pollTimeout must be a number >= 0: ${pollTimeout}`);
  }

  function evaluateCondition() {
    return new Promise((resolve, reject) => {
      try {
        resolve(predicate());
      } catch (ex) {
        reject(ex);
      }
    });
  }

  return new Promise(async (resolve, reject) => {
    const startTime = Date.now();
    const pollCondition = async () => {
      evaluateCondition().then((value) => {
        const elapsed = Date.now() - startTime;
        if (!!value) {
          resolve(value);
        } else if (timeout && elapsed >= timeout) {
          reject(
            new Error(
              `${message}\n`
              + `Wait timed out after ${elapsed}ms`));
        } else {
          setTimeout(pollCondition, pollTimeout);
        }
      }, reject);
    };
    await pollCondition();
  });
}
