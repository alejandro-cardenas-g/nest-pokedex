import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginatorDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  // @Type(() => Number)
  limit?: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  // @Type(() => Number)
  offset?: number;
}
