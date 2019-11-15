export function sanitizeErrorMessage(commandError: Error, savedError: Error): Error {
  const { name, message, stack } = commandError;

  const error = new Error(message);
  error.name = name;

  let stackArr = savedError.stack.split('\n');

  // remove duplicated error name from stack trace
  const updatedStack = stack.replace(`${error.name}: ${error.name}`, error.name);
  // remove first stack trace line from second stack trace
  stackArr[0] = '\n';
  // merge
  stackArr = [...updatedStack.split('\n'), ...stackArr];

  error.stack = stackArr
  // filter stack trace
    .filter(STACKTRACE_FILTER_FN)
    // remove duplicates from stack traces
    .reduce((acc, currentValue) => {
      return acc.includes(currentValue) ? acc : `${acc}\n${currentValue}`;
    }, '')
    .trim();

  return error;
}

export const pause = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * filter stack array
 * @param {string} stackRow
 * @returns {boolean}
 */
export const STACKTRACE_FILTER_FN = (stackRow) => {
  if (stackRow.match(STACK_START)) {
    return !STACKTRACE_FILTER.some((r) => stackRow.includes(r));
  }
  return true;
};

const STACK_START = /^\s+at /;

const STACKTRACE_FILTER = [
  // exclude oi-verify from stack traces
  'node_modules/oi-verify/',

  // other excludes
  'new Promise (<anonymous>)',
  'processTicksAndRejections',
  'Generator',
  '__awaiter ('
];
