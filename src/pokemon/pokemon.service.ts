import { Model } from 'mongoose';
import { Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}


  async create(createPokemon: CreatePokemonDto) {

    try {
      createPokemon.name = createPokemon.name.toLowerCase();
      const pokemon = await this.pokemonModel.create( createPokemon );
      return pokemon;
    } catch (error) {
      if( error.code === 11000){
        throw new BadRequestException(`Pokemos already exist with property ${error.keyValue}`)
      }
      throw new InternalServerErrorException(`Internal error :(`)
    }
  }

  async findAll() {
    return await this.pokemonModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
