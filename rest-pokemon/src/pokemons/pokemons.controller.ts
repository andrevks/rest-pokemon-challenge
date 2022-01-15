import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationParams } from 'src/utils/paginationParams';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    createPokemonDto: CreatePokemonDto,
  ) {
    return this.pokemonsService.create(createPokemonDto);
  }

  @Get('db')
  findAllDbByFilter(@Query() { offset = 0, limit = 10 }: PaginationParams) {
    return this.pokemonsService.findAllDbByFilter(offset, limit);
  }

  @Get()
  findByFilter(@Query() { offset = 0, limit = 10 }: PaginationParams) {
    return this.pokemonsService.findByFilter(offset, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonsService.update(+id, updatePokemonDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonsService.remove(+id);
  }
}
