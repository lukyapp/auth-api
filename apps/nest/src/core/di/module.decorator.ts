import { applyDecorators } from '@auth/core';
import { Module as NestModule } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';

export function Module(metadata: ModuleMetadata) {
  return applyDecorators(NestModule(metadata));
}
