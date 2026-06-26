import { Logger } from '@nestjs/common';

export function optionalRequire(packageName: string, loaderFn?: Function) {
  try {
    return loaderFn ? loaderFn() : require(packageName);
  } catch (e) {
    Logger.warn(`Optional dependency "${packageName}" was not found.`);
    return {};
  }
}
