// tslint:disable ban-types
import { Condition, WebDriver } from 'selenium-webdriver';
import { browser } from 'protractor';

export async function waitFor(
  predicate: Function | Condition<{}> | Promise<{}> | ((driver: WebDriver) => {}),
  message: string,
  timeout: number = 10 * 1000
): Promise<void> {
  await browser.wait(
    predicate,
    timeout,
    message
  );
}
