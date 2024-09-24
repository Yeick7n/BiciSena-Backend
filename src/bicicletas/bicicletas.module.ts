/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BicicletasService } from './bicicletas.service';
import { BicicletasController } from './bicicletas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicicleta } from './entities/bicicleta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bicicleta])],
  controllers: [BicicletasController],
  providers: [BicicletasService],
})
export class BicicletasModule {}
