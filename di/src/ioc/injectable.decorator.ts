import { applyDecorators } from '@auth/core';
import { Injectable } from '@nestjs/common';
import { inject } from './adonisjs/fold/inject';

export function injectable(): ClassDecorator {
  return applyDecorators(Injectable(), inject());
  // if (process.env.npm_package_dependencies__nestjs_common) {
  //   return applyDecorators(Injectable());
  // }
  // if (process.env.npm_package_dependencies__adonisjs_core) {
  //   return applyDecorators(inject());
  // }
  // throw new Error('@injectable decorator is not supported');
}
