import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'


@Injectable()
export class SeedService {

  constructor(
    public axios: AxiosInstance = axios
  ){}
  
  async executeSeed() {
    const response = await this.axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0',
    );
    console.log(response);
    return response;
  }
}

