import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePokemonDto {
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  height: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(10)
  weight: number;
}
