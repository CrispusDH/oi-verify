export function wait(
  predicate: Function | Promise<any>,
  timeout: number = 0,
  message: string = undefined,
  pollTimeout: number = 0): Promise<any> {
  if (timeout < 0) {
    throw new Error(`timeout must be a number >= 0: ${timeout}`);
  }
  if (pollTimeout < 0) {
    throw new Error(`pollTimeout must be a number >= 0: ${pollTimeout}`);
  }
  
  if (predicate instanceof Promise) {
    return new Promise((resolve, reject) => {
      if (!timeout) {
        resolve(predicate);
        return;
      }
      
      let start = Date.now();
      let timer = setTimeout(() => {
        timer = null;
        reject(
          new Error(
            (message ? `${message}\n` : '')
            + 'Timed out waiting for promise to resolve after '
            + (Date.now() - start) + 'ms'));
      }, timeout);
      const clearTimer = () => timer && clearTimeout(timer);
  
      predicate.then(
        (value) => {
          clearTimer();
          resolve(value);
        },
        (error) => {
          clearTimer();
          reject(error);
        });
    });
  }
  
  const fn = predicate;
  
  function evaluateCondition() {
    return new Promise((resolve, reject) => {
      try {
        resolve(fn());
      } catch (ex) {
        reject(ex);
      }
    });
  }

  return new Promise(async (resolve, reject) => {
    const startTime = Date.now();
    const pollCondition = async () => {
      evaluateCondition().then(function (value) {
        const elapsed = Date.now() - startTime;
        if (!!value) {
          resolve(value);
        } else if (timeout && elapsed >= timeout) {
          reject(
            new Error(
              (message ? `${message}\n` : '')
              + `Wait timed out after ${elapsed}ms`));
        } else {
          setTimeout(pollCondition, pollTimeout);
        }
      }, reject);
    };
    await pollCondition();
  });
}
