/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CiclopaseosService } from './ciclopaseos.service';
import { CiclopaseosController } from './ciclopaseos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciclopaseo } from './entities/ciclopaseo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciclopaseo])],
  controllers: [CiclopaseosController],
  providers: [CiclopaseosService],
})
export class CiclopaseosModule {}
