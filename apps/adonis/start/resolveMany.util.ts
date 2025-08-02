export type Make<T> = T extends AbstractConstructor<infer A> ? A : never
export type ErrorCreator = (message: string) => Error
type AbstractConstructor<T, Arguments extends unknown[] = any[]> = abstract new (
  ...args: Arguments
) => T
type Resolver = {
  make<Binding extends AbstractConstructor<any>>(
    binding: Binding,
    runtimeValues?: any[],
    createError?: ErrorCreator
  ): Promise<Make<Binding>>
}

export function resolveMany(resolver: Resolver, dependencies: []): Promise<[]>
export function resolveMany<Binding1>(
  resolver: Resolver,
  dependencies: [AbstractConstructor<Binding1>]
): Promise<[Awaited<Binding1>]>
export function resolveMany<Binding1, Binding2>(
  resolver: Resolver,
  dependencies: [AbstractConstructor<Binding1>, AbstractConstructor<Binding2>]
): Promise<[Awaited<Binding1>, Awaited<Binding2>]>
export function resolveMany<Binding1, Binding2, Binding3>(
  resolver: Resolver,
  dependencies: [
    AbstractConstructor<Binding1>,
    AbstractConstructor<Binding2>,
    AbstractConstructor<Binding3>,
  ]
): Promise<[Awaited<Binding1>, Awaited<Binding2>, Awaited<Binding3>]>
export function resolveMany<Binding1, Binding2, Binding3, Binding4>(
  resolver: Resolver,
  dependencies: [
    AbstractConstructor<Binding1>,
    AbstractConstructor<Binding2>,
    AbstractConstructor<Binding3>,
    AbstractConstructor<Binding4>,
  ]
): Promise<[Awaited<Binding1>, Awaited<Binding2>, Awaited<Binding3>, Awaited<Binding4>]>
export function resolveMany<Binding1, Binding2, Binding3, Binding4, Binding5>(
  resolver: Resolver,
  dependencies: [
    AbstractConstructor<Binding1>,
    AbstractConstructor<Binding2>,
    AbstractConstructor<Binding3>,
    AbstractConstructor<Binding4>,
    AbstractConstructor<Binding5>,
  ]
): Promise<
  [Awaited<Binding1>, Awaited<Binding2>, Awaited<Binding3>, Awaited<Binding4>, Awaited<Binding5>]
>
export function resolveMany<Binding1, Binding2, Binding3, Binding4, Binding5, Binding6>(
  resolver: Resolver,
  dependencies: [
    AbstractConstructor<Binding1>,
    AbstractConstructor<Binding2>,
    AbstractConstructor<Binding3>,
    AbstractConstructor<Binding4>,
    AbstractConstructor<Binding5>,
    AbstractConstructor<Binding6>,
  ]
): Promise<
  [
    Awaited<Binding1>,
    Awaited<Binding2>,
    Awaited<Binding3>,
    Awaited<Binding4>,
    Awaited<Binding5>,
    Awaited<Binding6>,
  ]
>
export function resolveMany<Binding1, Binding2, Binding3, Binding4, Binding5, Binding6, Binding7>(
  resolver: Resolver,
  dependencies: [
    AbstractConstructor<Binding1>,
    AbstractConstructor<Binding2>,
    AbstractConstructor<Binding3>,
    AbstractConstructor<Binding4>,
    AbstractConstructor<Binding5>,
    AbstractConstructor<Binding6>,
    AbstractConstructor<Binding7>,
  ]
): Promise<
  [
    Awaited<Binding1>,
    Awaited<Binding2>,
    Awaited<Binding3>,
    Awaited<Binding4>,
    Awaited<Binding5>,
    Awaited<Binding6>,
    Awaited<Binding7>,
  ]
>
export function resolveMany(
  resolver: Resolver,
  dependencies: AbstractConstructor<any>[]
): Promise<Awaited<any>[]> {
  return Promise.all(dependencies.map((dependency) => resolver.make(dependency)))
}
