/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {

  constructor(
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
  ) {}


  async create(createRolDto: CreateRolDto) {
    const rolFound = await this.rolRepository.findOne({
      where:{
        nombre: createRolDto.nombre
      }
    });

    if(rolFound){
      throw new BadRequestException('Rol ya creado')
    }

    const newRol = this.rolRepository.create(createRolDto)

    return await this.rolRepository.save(newRol)
  }

  async findAll() {
    return await this.rolRepository.find({
      relations: ['usuarios'],
    })
  }

  async findOne(id: number) {
    const rolFound = await this.rolRepository.find({
      where:{
        id
      },
      relations: ['usuarios'],
    });

    if(!rolFound){
      throw new NotFoundException('Rol no encontrado')
    }

    return rolFound;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const rolFound = await this.rolRepository.find({
      where:{
        id
      }
    });

    if(!rolFound){
      throw new NotFoundException('Rol no encontrado')
    }

    return await this.rolRepository.update(id, updateRolDto)
  }

  async remove(id: number) {

    const rolFound = await this.rolRepository.find({
      where:{
        id
      }
    });

    if(!rolFound){
      throw new NotFoundException('Rol no encontrado')
    }

    return await this.rolRepository.delete(id)
  }
}
