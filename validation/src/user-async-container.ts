import {
  getFromContainer,
  UseContainerOptions,
  ValidationError,
  Validator,
  ValidatorOptions,
} from 'class-validator';

let userAsyncContainer: {
  get<T>(someClass: { new (...args: any[]): T } | Function): Promise<T>;
};
let userContainerOptions: UseContainerOptions | undefined;

export function useAsyncContainer(
  iocContainer: { get(someClass: any): Promise<any> },
  options?: UseContainerOptions,
): void {
  userAsyncContainer = iocContainer;
  userContainerOptions = options;
}

export async function getFromAsyncContainer<T>(
  someClass: { new (...args: any[]): T } | Function,
): Promise<T> {
  if (userAsyncContainer) {
    try {
      console.log('someClass : ', someClass);
      const instance = await userAsyncContainer.get(someClass);
      console.log('instance : ', instance);
      if (instance) return instance;

      if (!userContainerOptions || !userContainerOptions.fallback)
        return instance;
    } catch (error) {
      console.log('error : ', error);
      if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
        throw error;
    }
  }
  return getFromContainer(someClass);
}

export function validateAsync(
  schemaNameOrObject: object | string,
  objectOrValidationOptions?: object | ValidatorOptions,
  maybeValidatorOptions?: ValidatorOptions,
): Promise<ValidationError[]> {
  if (typeof schemaNameOrObject === 'string') {
    return getFromAsyncContainer(Validator).then((validator) =>
      validator.validate(
        schemaNameOrObject,
        objectOrValidationOptions as object,
        maybeValidatorOptions,
      ),
    );
  } else {
    return getFromAsyncContainer(Validator).then((validator) =>
      validator.validate(
        schemaNameOrObject,
        objectOrValidationOptions as ValidatorOptions,
      ),
    );
  }
}
