import { applyDecorators } from '@auth/core';
import { Injectable } from '@nestjs/common';
import { inject } from './adonisjs/fold/inject';

export function injectable(): ClassDecorator {
  return applyDecorators(Injectable(), inject());
}
