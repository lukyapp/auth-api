import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class GetAllUsersQuery extends Dto<GetAllUsersQuery> {
  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly page: number;
  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly limit: number;
}
