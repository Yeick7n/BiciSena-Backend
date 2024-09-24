/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioRepository.save(createUsuarioDto);
  }

  async findAll() {
    const usersFound = await this.usuarioRepository.find({
      relations: ['rol']
    });

    if (usersFound.length === 0) {
      throw new ConflictException('No users found');
    }

    return usersFound;
  }

  async findOne(id: number) {
    const userFound = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: ['rol']
    });

    if (!userFound) {
      throw new ConflictException('User not found');
    }

    return userFound;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const userFound = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new ConflictException('User not found');
    }

    return await this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number) {
    const userFound = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new ConflictException('User not found');
    }

    return await this.usuarioRepository.delete(id);
  }

  ///
  /// methods for validations and to make the code look cleaner
  ///

  async findOneByUser(usuario: string) {
    const userFound = await this.usuarioRepository.findOne({
      where: {
        usuario,
      }
    });

    if (userFound) {
      throw new ConflictException('User already exists');
    }

    return userFound;
  }

  async findOneByEmail(email: string) {
    const emailFound = await this.usuarioRepository.findOne({
      where: {
        email,
      },
    });

    return emailFound;
  }

  // async isLogueado(isLogueado: boolean){
  //   const confirmarLogueo = await this.usuarioRepository.findOne({
  //     where: {
  //       isLogueado
  //     }
  //   })
  // }

  async findconfirmToken(token: string) {
    const tokenFound = await this.usuarioRepository.findOne({
      where: {
        confirmToken: token,
      },
    });

    if (!tokenFound) {
      throw new ConflictException('Token not found');
    }

    return tokenFound;
  }


}
