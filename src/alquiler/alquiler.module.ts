/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { AlquilerController } from './alquiler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alquiler } from './entities/alquiler.entity';
import { Bicicleta } from 'src/bicicletas/entities/bicicleta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alquiler, Bicicleta, Usuario])],
  controllers: [AlquilerController],
  providers: [AlquilerService],
})
export class AlquilerModule {}
