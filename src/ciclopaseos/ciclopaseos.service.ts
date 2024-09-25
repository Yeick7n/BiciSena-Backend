/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCiclopaseoDto } from './dto/create-ciclopaseo.dto';
import { UpdateCiclopaseoDto } from './dto/update-ciclopaseo.dto';
import { In, Repository } from 'typeorm';
import { Ciclopaseo } from './entities/ciclopaseo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CiclopaseosService {
  constructor(
    @InjectRepository(Ciclopaseo)
    private readonly ciclopaseoRepository: Repository<Ciclopaseo>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createCiclopaseoDto: CreateCiclopaseoDto) {
    const ciclopaseoFound = await this.ciclopaseoRepository.findOne({
      where: {
        fecha: createCiclopaseoDto.fecha,
        ubicacion: createCiclopaseoDto.ubicacion,
      },
    });

    if (ciclopaseoFound) {
      throw new BadRequestException('CicloPaseo ya creado');
    }

    const newMarca = this.ciclopaseoRepository.create(createCiclopaseoDto);

    return await this.ciclopaseoRepository.save(newMarca);
  }

  async findAll() {
    return await this.ciclopaseoRepository.find({
      relations: ['usuarios'],
    });
  }

  async findOne(id: number) {
    const ciclopaseoFound = await this.ciclopaseoRepository.find({
      where: {
        id,
      },
      relations: ['usuarios'],
    });

    if (!ciclopaseoFound) {
      throw new NotFoundException('Marca no encontrada');
    }

    return ciclopaseoFound;
  }

  async update(id: number, updateCiclopaseoDto: UpdateCiclopaseoDto) {
    const ciclopaseoFound = await this.ciclopaseoRepository.findOne({
      where: {
        id,
      },
      relations: ['usuarios'],
    });

    if (!ciclopaseoFound) {
      throw new NotFoundException('Marca no encontrada');
    }

    const usuarios = await this.usuarioRepository.find({
      where: {
        id: In(updateCiclopaseoDto.usuarios),
      },
    });

    if (usuarios.length <= 0) {
      return await this.ciclopaseoRepository.update(id, updateCiclopaseoDto);
    } else {
      const updateCicloPaseo = {
        ...ciclopaseoFound,
        ...updateCiclopaseoDto,
        usuarios,
      };

      return await this.ciclopaseoRepository.save(updateCicloPaseo);
    }
  }

  async remove(id: number) {
    const ciclopaseoFound = await this.ciclopaseoRepository.find({
      where: {
        id,
      },
    });

    if (!ciclopaseoFound) {
      throw new NotFoundException('Marca no encontrada');
    }

    return await this.ciclopaseoRepository.delete(id);
  }
}
