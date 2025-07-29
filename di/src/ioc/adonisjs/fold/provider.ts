/*
 * @adonisjs/fold
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import debug from './debug';
import type { ContainerResolver } from './resolver';
import type { InspectableConstructor } from './types';

/**
 * The default provider for resolving dependencies. It uses the resolver
 * to resolve all the values.
 */
export async function containerProvider(
  binding: InspectableConstructor,
  property: string | symbol | number,
  resolver: ContainerResolver<any>,
  runtimeValues?: any[],
) {
  const values = runtimeValues || [];

  /**
   * Return early when the class does not have static "containerInjections"
   * property or if there are no injections for the given property
   */
  if (!binding.containerInjections || !binding.containerInjections[property]) {
    return values;
  }

  const injections = binding.containerInjections[property].dependencies;
  const createError = binding.containerInjections[property].createError;

  /**
   * If the length of runtime values is more than the injections
   * length, then we make sure to return all the runtime
   * values and fill undefined slots with container lookup
   */
  if (values.length > injections.length) {
    if (debug.enabled) {
      debug(
        'created resolver plan. target: "[class %s]", property: "%s", injections: %O',
        binding.name,
        property,
        values.map((value, index) => {
          if (value !== undefined) {
            return value;
          }

          return injections[index];
        }),
      );
    }

    return Promise.all(
      values.map((value, index) => {
        if (value !== undefined) {
          return value;
        }

        const injection = injections[index];
        return resolver.resolveFor(binding, injection, undefined, createError);
      }),
    );
  }

  /**
   * Otherwise, we go through the injections, giving
   * priority to the runtime values for a given index.
   */
  if (debug.enabled) {
    debug(
      'created resolver plan. target: "[class %s]", property: "%s", injections: %O',
      binding.name,
      property,
      injections.map((injection, index) => {
        if (values[index] !== undefined) {
          return values[index];
        }

        return injection;
      }),
    );
  }

  return Promise.all(
    injections.map((injection, index) => {
      if (values[index] !== undefined) {
        return values[index];
      }

      return resolver.resolveFor(binding, injection, undefined, createError);
    }),
  );
}
