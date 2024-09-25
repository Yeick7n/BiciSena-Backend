/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from './entities/alquiler.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlquilerService {

  constructor(
    @InjectRepository(Alquiler) private alquilerRepository: Repository<Alquiler>,
  ){}

  create(createAlquilerDto: CreateAlquilerDto) {
    
  }

  findAll() {
    return `This action returns all alquiler`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alquiler`;
  }

  update(id: number, updateAlquilerDto: UpdateAlquilerDto) {
    return `This action updates a #${id} alquiler`;
  }

  remove(id: number) {
    return `This action removes a #${id} alquiler`;
  }
}
