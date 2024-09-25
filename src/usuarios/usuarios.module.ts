/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Ciclopaseo } from 'src/ciclopaseos/entities/ciclopaseo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Ciclopaseo])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [TypeOrmModule, UsuariosService]
})
export class UsuariosModule {}
