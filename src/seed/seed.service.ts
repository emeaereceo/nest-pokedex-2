import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokeResponse } from './interface/poke-response.interface';
import { clearConfigCache } from 'prettier';

@Injectable()
export class SeedService {

  constructor(private readonly httpService: HttpService){}

  async executeSEED(){

    const {data} = await this.httpService.axiosRef<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=6')

    data.results.forEach(({name, url})=>{
      const segments = url.split('/');
      const no = +segments[segments.length - 2]
      console.log({name,no})
    })
    
    return data.results
  }
  
}
