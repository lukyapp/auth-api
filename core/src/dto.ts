export abstract class Dto<T extends object, TOmitKey extends keyof T = never> {
  constructor(instance: Omit<T, TOmitKey>) {
    Object.assign(this, instance);
  }
}
