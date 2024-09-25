/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CiclopaseosService } from './ciclopaseos.service';
import { CiclopaseosController } from './ciclopaseos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciclopaseo } from './entities/ciclopaseo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciclopaseo, Usuario])],
  controllers: [CiclopaseosController],
  providers: [CiclopaseosService],
  exports: [CiclopaseosService]
})
export class CiclopaseosModule {}
