import { pause } from './utils';

export const wait = async (
  predicate: () => (boolean | Promise<boolean>),
  timeout: number = 0,
  message: string = '',
  pollTimeout: number = 0): Promise<void> => {
  if (timeout < 0) {
    throw new Error(`timeout must be a number >= 0: ${timeout}`);
  }
  if (pollTimeout < 0) {
    throw new Error(`pollTimeout must be a number >= 0: ${pollTimeout}`);
  }

  const evaluateCondition = async (): Promise<boolean> => {
    try {
      return await predicate();
    } catch (error) {
      throw error;
    }
  };

  const startTime = Date.now();
  const pollCondition = async () => {
    let entry = false;
    const elapsed = Date.now() - startTime;
    try {
      const value = await evaluateCondition();
      if (!!value) {
        return value;
      } else if (timeout && elapsed >= timeout) {
        entry = true;
        throw new Error(
          `${message}\n`
          + `Wait timed out after ${elapsed}ms`);
      } else {
        await pause(pollTimeout);
        await pollCondition();
      }
    } catch (error) {
      if (timeout && elapsed >= timeout) {
        if (entry === false) {
          throw new Error(
            `${error}\n`
            + `Wait timed out after ${elapsed}ms`);
        } else {
          throw error;
        }
      } else {
        await pause(pollTimeout);
        await pollCondition();
      }
    }
  };
  await pollCondition();
};
