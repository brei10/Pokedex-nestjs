import { Model, isValidObjectId } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException} from '@nestjs/common';
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

  async findOne(term: string):Promise<Pokemon> {
    let pokemon: Pokemon;

    if( !isNaN( +term ) ){
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if( !pokemon && isValidObjectId( term ) ){
      pokemon = await this.pokemonModel.findById( term );
    }

    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if( !pokemon )
        throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
   try {
      const pokemon = (await this.findOne(term));
      console.log(pokemon)
      if( updatePokemonDto.name ){
        pokemon.name = updatePokemonDto.name;
      }
      if( updatePokemonDto.no ){
        pokemon.no = updatePokemonDto.no;
      }
      await pokemon.save();
      return { ...pokemon.toObject(), ...updatePokemonDto }
   } catch (err) {
      if( err.code === 11000 ) throw new BadRequestException(`Pokemos already exist with property ${err.keyValue}`);
      throw new InternalServerErrorException(`Internal error :(`)
   }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
