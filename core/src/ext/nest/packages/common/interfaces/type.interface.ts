/* eslint-disable */
// @ts-nocheck

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
