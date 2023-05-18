import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios'
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokeResponse } from './interfaces/poke-responde.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios

    constructor(
        @InjectModel('Pokemon') private PokemonModel: Model<CreatePokemonDto>,
        private readonly http: AxiosAdapter
        ) 
    {}
  
  async executeSeed() {
    await this.PokemonModel.deleteMany({});
    const dataToInsert = [];
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
    );
   data.results.forEach( ({ url, name}) => {
      const no = url.split('/').at(-2);
      dataToInsert.push({ name, no })
    })
   await this.PokemonModel.insertMany(dataToInsert);
    return { success:true };
  }


}

