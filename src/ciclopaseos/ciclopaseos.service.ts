/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCiclopaseoDto } from './dto/create-ciclopaseo.dto';
import { UpdateCiclopaseoDto } from './dto/update-ciclopaseo.dto';
import { Repository } from 'typeorm';
import { Ciclopaseo } from './entities/ciclopaseo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CiclopaseosService {
  constructor(
    @InjectRepository(Ciclopaseo) private readonly ciclopaseoRepository: Repository<Ciclopaseo>,
  ) {}


  async create(createCiclopaseoDto: CreateCiclopaseoDto) {
    const ciclopaseoFound = await this.ciclopaseoRepository.findOne({
      where:{
        fecha: createCiclopaseoDto.fecha,
        ubicación: createCiclopaseoDto.ubicación,
      }
    });

    if(ciclopaseoFound){
      throw new BadRequestException('CicloPaseo ya creado')
    }

    const newMarca = this.ciclopaseoRepository.create(createCiclopaseoDto)

    return await this.ciclopaseoRepository.save(newMarca)
  }

  async findAll() {
    return await this.ciclopaseoRepository.find({})
  }

  async findOne(id: number) {
    const ciclopaseoFound = await this.ciclopaseoRepository.find({
      where:{
        id
      }
    });

    if(!ciclopaseoFound){
      throw new NotFoundException('Marca no encontrada')
    }

    return ciclopaseoFound;
  }

  async update(id: number, updateCiclopaseoDto: UpdateCiclopaseoDto) {
    const ciclopaseoFound = await this.ciclopaseoRepository.find({
      where:{
        id
      }
    });

    if(!ciclopaseoFound){
      throw new NotFoundException('Marca no encontrada')
    }

    return await this.ciclopaseoRepository.update(id, updateCiclopaseoDto)
  }

  async remove(id: number) {

    const ciclopaseoFound = await this.ciclopaseoRepository.find({
      where:{
        id
      }
    });

    if(!ciclopaseoFound){
      throw new NotFoundException('Marca no encontrada')
    }

    return await this.ciclopaseoRepository.delete(id)
  }
}
