import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interface/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly http:AxiosAdapter
    ){}

  async executeSEED(){
    
    // De Esta forma cada vez que ejecutamos el seed, borra la tabla y vuelve a crear.
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0')

    // De esta forma nuestro metodo itera cada registro creado con la base de datos
    //508ms

    // data.results.forEach(async({name, url})=>{
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2]
    //   const pokemon = await this.pokemonModel.create({name,no})
    // })

    //*************************************************************** */

    // la iteracion la hace con una lista, una vez que completa la lista (promesas) se insertar todos los registros
    //698ms
    // const insertPromisesArray = [];

    // data.results.forEach(({name, url})=>{
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2]

    //   insertPromisesArray.push(
    //     this.pokemonModel.create({name,no})
    //   )
    // })

    // await Promise.all(insertPromisesArray)

    //*************************************************************** */

    // La forma optima de insertar?
    // 625ms
    const pokemonToInsert: {name:string,no:number}[] = [];

    data.results.forEach(({name, url})=>{
      const segments = url.split('/');
      const no = +segments[segments.length - 2]

      pokemonToInsert.push({name,no})
    })

    await this.pokemonModel.insertMany(pokemonToInsert)
    
    return 'SEED Executed'
  }
  
}
