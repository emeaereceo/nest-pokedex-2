import { HttpService } from '@nestjs/axios';
import { HttpAdapter } from './../interfaces/http-adapter.interface'
import { Injectable } from '@nestjs/common';


@Injectable()
export class AxiosAdapter implements HttpAdapter {
  
  constructor(
    private readonly httpService: HttpService
  ){}

  async get<T>(url: string) {
    try {
      const {data} = await this.httpService.axiosRef<T>(url, {headers : {'Accept-Encoding':'gzip,deflate,compress'}})
      return data;

    } catch (error) {
      console.log(error)
      throw new Error('This is a Error - Check logs')
    }
  }

}