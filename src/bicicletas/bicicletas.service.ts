/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBicicletaDto } from './dto/create-bicicleta.dto';
import { UpdateBicicletaDto } from './dto/update-bicicleta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bicicleta } from './entities/bicicleta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BicicletasService {
  constructor(
    @InjectRepository(Bicicleta)
    private readonly bicicletaRepository: Repository<Bicicleta>,
  ) {}

  async create(createBicicletaDto: CreateBicicletaDto) {
    const newBicicleta = this.bicicletaRepository.create(createBicicletaDto);

    return await this.bicicletaRepository.save(newBicicleta);
  }

  async findAll() {
    return await this.bicicletaRepository.find({
      relations: ['marca'],
    });
  }

  async findOne(id: number) {
    const BicicletaFound = await this.bicicletaRepository.find({
      where: {
        id,
      },
      relations: ['marca'],
    });

    if (!BicicletaFound) {
      throw new NotFoundException('Marca no encontrada');
    }

    return BicicletaFound;
  }

  async update(id: number, updateBicicletaDto: UpdateBicicletaDto) {
    const BicicletaFound = await this.bicicletaRepository.find({
      where: {
        id,
      },
    });

    if (!BicicletaFound) {
      throw new NotFoundException('Marca no encontrada');
    }

    return await this.bicicletaRepository.update(id, updateBicicletaDto);
  }

  async remove(id: number) {
    const BicicletaFound = await this.bicicletaRepository.find({
      where: {
        id,
      },
    });

    if (!BicicletaFound) {
      throw new NotFoundException('Marca no encontrada');
    }

    return await this.bicicletaRepository.delete(id);
  }

  async findBiciByRegional(id:number) {
    const BicicletaFound = await this.bicicletaRepository.find({
      where: {
        regional: {
          id
        }
      },
      relations: ['regional'],
    });

    return BicicletaFound
  }
}
