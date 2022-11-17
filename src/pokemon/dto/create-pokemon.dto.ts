import { IsInt, Min, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
