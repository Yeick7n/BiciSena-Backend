/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { Alquiler } from './entities/alquiler.entity';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';

@Controller('alquiler')
export class AlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Post('crear')
  async crearAlquiler(
    @Body() createAlquilerDto: CreateAlquilerDto,
  ): Promise<Alquiler> {
    return this.alquilerService.crearAlquiler(createAlquilerDto);
  }

  @Patch('devolver/:id')
  async devolverBicicleta(
    @Param('id') alquilerId: number,
    @Body('hora_fin') horaFin: string,
  ): Promise<Alquiler> {
    return this.alquilerService.devolverlaBicicleta(alquilerId, horaFin);
  }
}
