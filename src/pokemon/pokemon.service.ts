import { Model, isValidObjectId } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
    ){}


  async create(createPokemon: CreatePokemonDto) {

    try {
      createPokemon.name = createPokemon.name.toLowerCase();
      const pokemon = await this.pokemonModel.create( createPokemon );
      return pokemon;
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  async findAll(paginationDto: PaginationDto) {
    console.log(this.configService.get('JEJE'))
    const { offset = 0, limit = 10 } = paginationDto;
    return await this.pokemonModel.find({})
    .skip(offset)
    .limit(limit)
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
      const pokemon = await this.findOne(term);
      if( updatePokemonDto.name ){
        pokemon.name = updatePokemonDto.name;
      }
      if( updatePokemonDto.no ){
        pokemon.no = updatePokemonDto.no;
      }
      await pokemon.save();
      return { ...pokemon.toObject(), ...updatePokemonDto }
   } catch (err) {
      this.handleExceptions( err )
   }
  }

  async remove(_id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id });
    if( deletedCount === 0 ) throw new BadRequestException(`Pokemon with id ${ _id } not found`);
    return { success: true } 
  }

  private handleExceptions( error ) {
    if( error.code === 11000 ) throw new BadRequestException(`Pokemon already exist with property ${JSON.stringify(error.keyValue)}`);
    throw new InternalServerErrorException(`Internal error :(`)

  }
}
