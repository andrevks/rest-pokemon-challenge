import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepo: Repository<Pokemon>,
    private httpService: HttpService,
  ) {}

  create(createPokemonDto: CreatePokemonDto) {
    //new Pokemon(data)
    const pokemon = this.pokemonRepo.create(createPokemonDto);
    return this.pokemonRepo.save(pokemon);
  }

  // findAll() {
  //   return `This action returns all pokemons`;
  // }

  async findByFilter(offset: number) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;
    const pokemons = await this.httpService.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data.results;
      }),
    );
    return pokemons;
  }

  async findOne(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await this.httpService.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
    return pokemon;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    const updateResult = await this.pokemonRepo.update(id, updatePokemonDto);
    if (!updateResult.affected) {
      throw new EntityNotFoundError(Pokemon, id);
    }

    return this.pokemonRepo.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.pokemonRepo.delete(id);
    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Pokemon, id);
    }
  }
}
