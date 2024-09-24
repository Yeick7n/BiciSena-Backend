/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca) private readonly marcaRepository: Repository<Marca>,
  ) {}


  async create(createMarcaDto: CreateMarcaDto) {
    const marcaFound = await this.marcaRepository.findOne({
      where:{
        nombre: createMarcaDto.nombre
      }
    });

    if(marcaFound){
      throw new BadRequestException('Marca ya creado')
    }

    const newMarca = this.marcaRepository.create(createMarcaDto)

    return await this.marcaRepository.save(newMarca)
  }

  async findAll() {
    return await this.marcaRepository.find({})
  }

  async findOne(id: number) {
    const marcaFound = await this.marcaRepository.find({
      where:{
        id
      }
    });

    if(!marcaFound){
      throw new NotFoundException('Marca no encontrada')
    }

    return marcaFound;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    const marcaFound = await this.marcaRepository.find({
      where:{
        id
      }
    });

    if(!marcaFound){
      throw new NotFoundException('Marca no encontrada')
    }

    return await this.marcaRepository.update(id, updateMarcaDto)
  }

  async remove(id: number) {

    const marcaFound = await this.marcaRepository.find({
      where:{
        id
      }
    });

    if(!marcaFound){
      throw new NotFoundException('Marca no encontrada')
    }

    return await this.marcaRepository.delete(id)
  }
}
