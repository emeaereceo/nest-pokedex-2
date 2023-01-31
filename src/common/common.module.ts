import { HttpModule } from '@nestjs/axios';
import { AxiosAdapter } from './adapters/axios.adapter';
import { Module } from '@nestjs/common';

@Module({
  imports:[HttpModule],
  providers:[AxiosAdapter],
  exports:[AxiosAdapter],
})
export class CommonModule {}
