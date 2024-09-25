/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { UpdateRegionalDto } from './dto/update-regional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Regional } from './entities/regional.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionalService {

  constructor(
    @InjectRepository(Regional) private readonly regionalRepository: Repository<Regional>,
  ){}

  async create(createRegionalDto: CreateRegionalDto) {
    const regionalFound = await this.regionalRepository.findOne({
      where:{
        nombre: createRegionalDto.nombre
      }
    });

    if(regionalFound){
      throw new BadRequestException('Regional ya creada')
    }

    const newRegional = this.regionalRepository.create(createRegionalDto)

    return await this.regionalRepository.save(newRegional)
  }

  async findAll() {
    return await this.regionalRepository.find({
      // relations: ['usuarios','bicicletas']
    })
  }

  async findOne(id: number) {
    const regionalFound = await this.regionalRepository.find({
      where:{
        id
      },
      // relations: ['usuarios','bicicletas']
    });

    if(!regionalFound){
      throw new NotFoundException('Regional no encontrada')
    }

    return regionalFound;
  }

  async update(id: number, updateMRegionalDto: UpdateRegionalDto) {
    const regionalFound = await this.regionalRepository.find({
      where:{
        id
      }
    });

    if(!regionalFound){
      throw new NotFoundException('Regional no encontrada')
    }

    return await this.regionalRepository.update(id, updateMRegionalDto)
  }

  async remove(id: number) {

    const regionalFound = await this.regionalRepository.find({
      where:{
        id
      }
    });

    if(!regionalFound){
      throw new NotFoundException('Regional no encontrada')
    }

    return await this.regionalRepository.delete(id)
  }
}
