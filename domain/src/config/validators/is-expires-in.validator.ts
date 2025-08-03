import { applyDecorators } from '@auth/core';
import { IsString, Matches } from 'class-validator';

export function IsExpiresIn() {
  return applyDecorators(
    IsString(),
    Matches(/^\d+[smhd]$/, {
      message:
        'Invalid expiration format. Expected format: {number}{m|h|d|w|y} (e.g., "10m", "2h", "3d")',
    }),
  );
}
