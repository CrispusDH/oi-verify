export function wait(
  predicate: () => (boolean | Promise<boolean>),
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
      try {
        const value = await evaluateCondition();
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
      } catch (error) {
        const elapsed = Date.now() - startTime;
        if (timeout && elapsed >= timeout) {
          reject(
            new Error(
              `${error}\n`
              + `Wait timed out after ${elapsed}ms`));
        } else {
          setTimeout(pollCondition, pollTimeout);
        }
      }
    };
    await pollCondition();
  });
}
