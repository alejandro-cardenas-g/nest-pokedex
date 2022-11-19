import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemon: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {}

  async create(payload: CreatePokemonDto) {
    payload.name = payload.name.toLowerCase();
    const { name, no } = payload;
    try {
      const insertedPokemon = await this.pokemon.create({
        name,
        no,
      });
      return insertedPokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(findOptions: PaginatorDto) {
    const {
      limit = this.configService.getOrThrow<number>('defaultLimit'),
      offset = 0,
    } = findOptions;
    return this.pokemon.find().limit(limit).skip(offset).sort({
      no: 'asc',
    });
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(Number(term))) {
      pokemon = await this.pokemon.findOne({
        no: term,
      });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemon.findById(term);
    }
    if (!pokemon)
      pokemon = await this.pokemon.findOne({
        name: term,
      });
    if (!pokemon) throw new NotFoundException();
    return pokemon;
  }

  async update(term: string, payload: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (payload.name) payload.name = payload.name.toLowerCase();
    try {
      await pokemon.updateOne(payload, { new: true });
      return {
        ...pokemon.toJSON(),
        ...payload,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const deletedResult = await this.pokemon.deleteOne({
      _id: id,
    });
    if (!deletedResult.deletedCount)
      throw new NotFoundException('Pokemon with given id does not exists');
    return true;
  }

  private handleExceptions(error: any) {
    if (error.code && error.code === 11000)
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error?.keyValue || '')}`,
      );
    throw new InternalServerErrorException();
  }
}
