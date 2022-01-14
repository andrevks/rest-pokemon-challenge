import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { stringify } from 'querystring';

@Injectable()
export class PokemonsService {
  constructor(private httpService: HttpService) {}

  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
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

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
