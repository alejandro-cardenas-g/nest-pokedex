import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/httpAdapters/axios.adapter';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { IPokemonResponse } from './interfaces/pokemonResponse.interface';
@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemon: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async populate() {
    const data = await this.http.get<IPokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=200',
    );
    const pokemonsToSave = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      return {
        name,
        no: Number(segments[segments.length - 2]),
      };
    });
    await this.pokemon.deleteMany({});
    await this.pokemon.insertMany(pokemonsToSave);
    return pokemonsToSave;
  }
}
